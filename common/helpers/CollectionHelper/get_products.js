const { CollectionModel, ProductModel, SEOModel, PriceModel } = require('../../models');
const { get_setting } = require('../SettingHelper');

const fields = require('./fields');
const { operator_to_mongo_query, operator_to_mongo_filter_query } = require('./operator_to_mongo');

module.exports = async (condition, filter_query=null,sort_query=null) => {

    // prepare language array for multi languages fields
    let all_languages = [];
    try {
        const setting = await get_setting('web_content_languages');
        all_languages = setting.value.map(lang => lang.code);
    } catch (e) {
        console.log('error in get settings:', e);
        all_languages = ['en', 'fa'];
    }

    let product_query = [];
    let mix_variant_query = [];

    const wheres = condition.wheres || [];
    for (let i = 0; i < wheres.length; i += 1) {
        let field;
        try {
            field = fields.find(field => field.key == wheres[i].where_field);

            if (field) {
                if (field.is_in_mix_variant) {
                    if (field.is_multi_language) {
                        mix_variant_query.push(await operator_to_mongo_filter_query("$$mix_variant." + field.query_path, wheres[i].operator, wheres[i].where_value, field.is_multi_language, all_languages));
                    } else {
                        mix_variant_query.push(await operator_to_mongo_filter_query("$$mix_variant." + field.query_path, wheres[i].operator, wheres[i].where_value.value, field.is_multi_language, wheres[i].where_value.fields));
                    }
                } else {
                    if (field.is_multi_language) {
                        product_query.push(await operator_to_mongo_query(field.query_path, wheres[i].operator, wheres[i].where_value, field.is_multi_language, all_languages));
                    } else {
                        product_query.push(await operator_to_mongo_query(field.query_path, wheres[i].operator, wheres[i].where_value.value, field.is_multi_language, wheres[i].where_value.fields));
                    }
                }
            }
        } catch { /* empty */ }
    }

    const aggregate = [];

    aggregate.push(...[
        // join seos collection
        {
            $lookup: {
                "from": SEOModel.collection.name,
                "localField": "seo_id",
                "foreignField": "_id",
                "as": "seo"
            }
        },
        // join prices in mix_variants
        {
            $addFields: {
                "mix_variant": { "$ifNull": ["$mix_variant", []] }
            }
        },
        {
            $lookup: {
                "from": PriceModel.collection.name,
                "localField": "mix_variant.price_id",
                "foreignField": "_id",
                "as": "prices"
            }
        },
        // add price field to mix_variant
        {
            $addFields: {
                "mix_variant": {
                    $map: {
                        "input": "$mix_variant",
                        "in": {
                            $mergeObjects: [
                                "$$this",
                                {
                                    "price": {
                                        $arrayElemAt: [
                                            "$prices",
                                            {
                                                "$indexOfArray": [
                                                    "$prices._id",
                                                    "$$this.price_id"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        // add has_offer and main_price to price
        {
            $addFields: {
                "mix_variant": {
                    $map: {
                        "input": "$mix_variant",
                        "in": {
                            $function: {
                                body: `function (mix_variant) {
                                    const has_offer_price_function = (offer_price, offer_startAt, offer_expireAt) => {
                                        try { offer_price = parseFloat(offer_price); }
                                        catch (e) { offer_price = 0; }
                                        try {
                                            if (!(offer_startAt instanceof Date))
                                                offer_startAt = new Date(parseInt(offer_startAt));
                                            if (isNaN(offer_startAt.getTime())) offer_startAt = null;
                                        }
                                        catch (e) { offer_startAt = null; }
                                        try {
                                            if (!(offer_expireAt instanceof Date))
                                                offer_expireAt = new Date(parseInt(offer_expireAt));
                                            if (isNaN(offer_expireAt.getTime())) offer_expireAt = null;
                                        }
                                        catch (e) { offer_expireAt = null; }

                                        if (offer_price > 0) {
                                            if ((offer_startAt && offer_startAt.getTime() < Date.now()) || !offer_startAt) {
                                                if ((offer_expireAt && offer_expireAt.getTime() > Date.now()) || !offer_expireAt) {
                                                    return true;
                                                }
                                            }
                                        }
                                        return false;
                                    };
                                    const has_offer_price = has_offer_price_function(mix_variant.price.offer_price, mix_variant.price.offer_startAt, mix_variant.price.offer_expireAt);

                                    mix_variant.price.has_offer = has_offer_price;
                                    if (has_offer_price)
                                        mix_variant.price.main_price = mix_variant.price.offer_price;
                                    else
                                        mix_variant.price.main_price = mix_variant.price.price;
                                    return mix_variant;
                                }`,
                                args: ["$$this"],
                                lang: "js"
                            }
                        }
                    }
                }
            }
        },
        { $project: { "prices": 0 } },
    ]
    );

    if (filter_query)
        aggregate.push(...[
            { $match: filter_query }
        ]);

    if (sort_query)
        aggregate.push(...[
            { $sort: sort_query }
        ]);

    if (condition.logic == CollectionModel.logics.and) {

        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~AND~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // add product query to aggregate
        if (product_query.length > 0) {

            product_query = { "$and": product_query };

            aggregate.push(
                // filter query
                { $match: product_query }
            );
        }

        if (mix_variant_query.length > 0) {

            mix_variant_query = { "$and": mix_variant_query };

            aggregate.push(...[
                {
                    $addFields: {
                        "mix_variant": {
                            $filter: {
                                input: "$mix_variant",
                                as: "mix_variant",
                                cond: mix_variant_query,
                            }
                        }
                    }
                },
                {
                    $match: {
                        $expr: { $gt: [{ $size: "$mix_variant" }, 0] }
                    }
                },
            ]);
        }
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~OR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    else if (condition.logic == CollectionModel.logics.or) {

        // add product query to aggregate
        if (product_query.length > 0) {

            product_query = { "$or": product_query };

            aggregate.push(
                // filter query
                { $match: product_query },
            );
        } else {
            // dont add any field
            aggregate.push(...[{
                $match: { no_match_field: "no_product" }
            }]);
        }

        if (mix_variant_query.length > 0) {

            mix_variant_query = { "$or": mix_variant_query };

            aggregate.push(...[
                {
                    $unionWith: {
                        coll: ProductModel.collection.name,
                        pipeline: [
                            {
                                $addFields: {
                                    "mix_variant": {
                                        $filter: {
                                            input: "$mix_variant",
                                            as: "mix_variant",
                                            cond: mix_variant_query,
                                        }
                                    }
                                }
                            },
                            {
                                $match: {
                                    $expr: { $gt: [{ $size: "$mix_variant" }, 0] }
                                }
                            },
                        ]
                    },
                },
                // todo: merge duplicate documents (last solution is $group and list all fields of product)
            ]);
        }
    }

    if (aggregate.length <= 0)
        aggregate.push({ $match: {} });

    // add unwind stage
    aggregate.push({
        $unwind: {
            path: "$mix_variant",
            includeArrayIndex: 'mix_variant_index'
        },
    }, {
        $addFields: {
            mix_variant_unique_key: {
                $function: {
                    body: function (_id, mix_variant) {
                        // return product_id + mix_variant.keys
                        const id = _id.valueOf();
                        let mix_variant_keys;
                        try {
                            mix_variant_keys = mix_variant.keys.toString();
                        } catch (e) {
                            mix_variant_keys = '--';
                        }
                        return id + '-' + mix_variant_keys;
                    },
                    args: ['$_id', '$mix_variant'],
                    lang: 'js'
                }
            }
        }
    });

    // add sort stages
    if (Array.isArray(condition.orders) && condition.orders.length > 0) {
        for (let i = 0; i < condition.orders.length; i++) {
            let query_path;
            try {
                const field = fields.find(field => field.key == condition.orders[i].field);
                if (field.is_in_mix_variant)
                    query_path = `mix_variant.${field.query_path}`;
                else
                    query_path = field.query_path;
            } catch {
                query_path = null;
            }
            if (query_path) {
                let type;
                try {
                    if (condition.orders[i].type === CollectionModel.orders_types.asc)
                        type = 1;
                    else
                        type = -1;
                } catch {
                    type = 1;
                }
                aggregate.push({
                    $sort: {
                        [query_path]: type
                    }
                });
            }
        }
    }

    // add limit stage
    if (condition.limit && (condition.limit > 0))
        aggregate.push({
            $limit: condition.limit,
        });

    // return aggregate;

    let products = await ProductModel.aggregate(aggregate);

    // merge duplicate documents
    if (condition.logic == CollectionModel.logics.or) {
        products = products.filter((value, index, self) => {
            return self.findIndex(product => {
                return product.mix_variant_unique_key === value.mix_variant_unique_key;
            }) === index;
        });
    }

    // // merge duplicate documents
    // if (condition.logic == CollectionModel.logics.or) {
    //     const filtered_products = [];
    //     products.map(product => {
    //         let exists_in_filtered_products = false;
    //         filtered_products.map(filtered_product => {
    //             if (String(product._id) == String(filtered_product._id)) {
    //                 exists_in_filtered_products = true;
    //                 const filtered_mix_variant = filtered_product.mix_variant || [];
    //                 (product.mix_variant || []).map(mix_variant => {
    //                     const exists_mix_variant = filtered_mix_variant.some((filtered) => { return !filtered.keys.some(key => { return !mix_variant.keys.includes(key); }); });
    //                     if (!exists_mix_variant) {
    //                         filtered_mix_variant.push(mix_variant);
    //                     }
    //                 });
    //             }
    //         });
    //         if (!exists_in_filtered_products) {
    //             filtered_products.push(product);
    //         }
    //     });
    //     products = filtered_products;
    // }

    return products;
};
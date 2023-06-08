const { CategoryModel } = require('@common/models');
const { get_setting } = require('@helpers/SettingHelper');
const mongoose = require('mongoose');

module.exports = async (parent, args, { models: { ProductModel, TagModel } }) => {

    const pageValue = args.page || 1;
    const limitValue = args.limit || process.env.PAGINATION_LIMIT;
    const sortOperator = args.sort?.operator || process.env.SORT_DEFAULT_OPERATOR;
    let sortField = args.sort?.field || 'createdAt';

    const searchText = args.filter?.search_text || null;
    let categoryIds = args.filter?.category_ids || [];
    let brandIds = args.filter?.brand_ids || [];
    let tagIds = args.filter?.tag_ids || [];
    const typeField = args.filter?.type || ProductModel.types.product;

    const priceMinField = args.filter?.min_price || null;
    const priceMaxField = args.filter?.max_price || null;
    const isSpecial = args.filter?.is_special;
    const only_description = args.filter?.only_description;
    const show_price = args.filter?.show_price;
    const isMainPrice = args.filter?.is_main;

    const aggregate_query = [];

    aggregate_query.push({
        $addFields: {
            id: '$_id'
        }
    });

    //publishAt
    aggregate_query.push({
        $match: {
            publishAt: {
                $lt: new Date(),
            }
        }
    });

    // filter by type of product
    aggregate_query.push(
        {
            $match: {
                type: typeField,
                status: ProductModel.statuses.show,
            }
        },
    );

    // unwind mix_variant
    aggregate_query.push({
        $unwind: {
            path: '$mix_variant',
        },
    });

    // add price relation aggregation
    if (typeField != 4) { // except preview type
        aggregate_query.push(
            {
                $lookup: {
                    from: 'prices',
                    localField: 'mix_variant.price_id',
                    foreignField: '_id',
                    as: 'mix_variant.price',
                },
            },
            {
                $unwind: {
                    path: '$mix_variant.price',
                },
            },
            {
                $addFields: {
                    'mix_variant': {
                        $function: {
                            body: function (mix_variant) {
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
                            },
                            args: ['$mix_variant'],
                            lang: 'js'
                        }
                    }

                }
            }
        );
    }

    aggregate_query.push(
        {
            $match: {
                'mix_variant.is_active': true
            }
        },
    );

    // filter by search text
    if (searchText && typeof searchText == 'string') {
        let langs = await get_setting('web_content_languages');
        langs = langs.value.map(lang => lang.code);

        const title_query = [];
        for (let i in langs) {
            title_query.push({ [`title.${langs[i]}`]: { $regex: searchText } });
        }
        const summary_query = [];
        for (let i in langs) {
            summary_query.push({ [`summary.${langs[i]}`]: { $regex: searchText } });
        }
        const description_query = [];
        for (let i in langs) {
            description_query.push({ [`description.${langs[i]}`]: { $regex: searchText } });
        }

        aggregate_query.push({
            $match: {
                $or: [
                    {
                        $or: title_query,
                    },
                    {
                        $or: summary_query,
                    },
                    {
                        $or: description_query,
                    },
                ]
            }
        });
    }

    // filter by category ids
    categoryIds = categoryIds.filter(value => value); // remove nulls
    if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
        let objectIds = [];
        let i = 0;
        while (i < categoryIds.length){
            try {
                objectIds.push(mongoose.Types.ObjectId(categoryIds[i]));

                // add child_categories to queue
                const child_categories = await CategoryModel.find({
                    parent_id: categoryIds[i],
                });
                for (const child_category of child_categories) {
                    categoryIds.push(child_category.id);
                }
            } catch { /* empty */ }
            i++;
        }
        aggregate_query.push(
            {
                $match: {
                    category_id: { $in: objectIds },
                }
            },
        );
    }

    // filter by category ids
    brandIds = brandIds.filter(value => value); // remove nulls
    if (brandIds && Array.isArray(brandIds) && brandIds.length > 0) {
        let objectIds = [];
        for (let i in brandIds) {
            try {
                objectIds.push(mongoose.Types.ObjectId(brandIds[i]));
            } catch { /* empty */ }
        }
        aggregate_query.push(
            {
                $match: {
                    brand_id: { $in: objectIds },
                }
            },
        );
    }

    // filter by category ids
    tagIds = tagIds.filter(value => value); // remove nulls
    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
        let objectIds = [];
        for (const i in tagIds) {
            try {
                objectIds.push(mongoose.Types.ObjectId(tagIds[i]));
            } catch { /* empty */ }
        }
        aggregate_query.push(
            {
                $lookup: {
                    from: 'tags',
                    localField: 'tag_group_id',
                    foreignField: 'tag_group_ids',
                    as: 'tag_group_tags',
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                deep: 1,
                            },
                        },
                    ]
                }
            },
        );
        aggregate_query.push(
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                { tag_ids: { $in: objectIds } },
                                { 'tag_group_tags._id': { $in: objectIds } }
                            ]
                        },
                        { deep: TagModel.deeps.tag }
                    ]
                }
            }
        );
    }

    if (priceMinField != undefined) {
        aggregate_query.push(
            {
                $match: {
                    'mix_variant.price.main_price': {
                        $gte: priceMinField
                    }
                }
            },
        );
    }

    if (priceMaxField != undefined) {
        aggregate_query.push(
            {
                $match: {
                    'mix_variant.price.main_price': {
                        $lte: priceMaxField
                    }
                }
            },
        );
    }

    if (isSpecial != undefined) {
        aggregate_query.push(
            {
                $match: {
                    'is_special': isSpecial ? true : false
                }
            },
        );
    }
    if (only_description != undefined) {
        aggregate_query.push(
            {
                $match: {
                    'only_description': only_description ? true : false
                }
            },
        );
    }
    if (show_price != undefined) {
        aggregate_query.push(
            {
                $match: {
                    'show_price': show_price ? true : false
                }
            },
        );
    }
    if (isMainPrice != undefined) {
        aggregate_query.push(
            {
                $match: {
                    'mix_variant.is_main_price': isMainPrice ? true : false
                }
            },
        );
    }

    if (sortField == 'price')
        sortField = 'mix_variant.price.main_price';

    // add sort to aggregate
    aggregate_query.push({ $sort: { [sortField]: sortOperator == 'asc' ? 1 : -1 }, });

    //paginate options
    const options = {
        page: pageValue,
        limit: limitValue
    };

    //aggregate Paginate
    const myAggregate = ProductModel.aggregate(aggregate_query);
    const products = await ProductModel.aggregatePaginate(myAggregate, options);

    return {
        data: products.docs,
        paginate: {
            total: products.totalDocs,
            limit: products.limit,
            page: products.page,
            pages: products.totalPages,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
        },
    };
};

const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');
const SEOHelper = require('@helpers/SEOHelper');
const { ProductModel, PriceModel } = require('@models');

module.exports = async (parent, args, { models: { CollectionModel, MediaModel }, helpers: { ValidationHelper, PriceHelper, MediaHelper: { attachMedia } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['list', 'extra_fields']).all();
    try { input.list = collect(input.list).map((item) => { return collect(item).only(['product_id', 'has_variant_key', 'mix_variant_keys', 'sort']).all(); }).all(); } catch { /* empty */ }
    try { input.extra_fields = collect(input.extra_fields).only(['title', 'description', 'show', 'seo', 'media', 'startAt', 'expireAt', 'has_timer', 'cover', 'cover_position']).all(); } catch { /* empty */ }
    input.user_id = AuthUser.id;
    input.type = CollectionModel.types.static;
    input.source = CollectionModel.sources.bag;

    // validate input :
    const rules = {
        'list.*': {
            product_id: ['required', 'exists:ProductModel,_id'],
            has_variant_key: ['boolean'],
            'mix_variant_keys.*': 'string',
            sort: 'integer',
        },
        extra_fields: {
            title: await multilang_rules(['string']),
            description: await multilang_rules(['string']),
            show: ['boolean'],
            // seo: 'seo_input',
            media: {
                media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
                alt: ['string'],
                url: 'string',
            },
            startAt: 'timestamp',
            expireAt: 'timestamp',
            has_timer: 'boolean',
            cover: {
                media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
                alt: ['string'],
                url: 'string',
            },
            cover_position: [{ in: Object.values(CollectionModel.cover_positions) }],
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);
    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input?.extra_fields?.seo, { generate_url: input.title, model_name: CollectionModel.modelName });

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    if (input?.extra_fields?.title)
        input.extra_fields.title = await multilang_remove_extra_fields(input.extra_fields.title);
    if (input?.extra_fields?.description)
        input.extra_fields.description = await multilang_remove_extra_fields(input.extra_fields.description);

    // create collection
    const collection = await CollectionModel.create(input);
    // update media relation
    if (input?.extra_fields?.media?.media_id)
        await attachMedia(collection, input.extra_fields.media.media_id);
    if (input?.extra_fields?.cover?.media_id)
        await attachMedia(collection, input.extra_fields.cover.media_id);

    // if there is no validation error create prices
    if (Array.isArray(input.list)) {
        for (let i = 0; i < input.list.length; i += 1) {
            if (input.list.has_variant_key) {
                try {
                    let normal_price;
                    try {
                        normal_price = (await PriceHelper.getPrice({ model_id: input.list.product_id, modelName: ProductModel.modelName }, input.list.mix_variant_keys)).price;
                    } catch {
                        normal_price = null;
                    }

                    const result = await PriceHelper.createVariantPrice({ model_id: normal_price.model_id, model_name: normal_price.model_name, model_variant_keys: normal_price.model_variant_keys }, { ...normal_price.toObject(), type: PriceModel.types.bag });
                    if (!result.price) {
                        console.log('failed to create price');
                    }
                    collection.list[i].price_id = result.price._id;
                } catch { /* empty */ }
            } else {
                const mix_variants = (await ProductModel.findById(input.list.product_id)).mix_variant;
                for (let j in mix_variants) {
                    try {
                        let normal_price;
                        try {
                            normal_price = (await PriceHelper.getPrice({ model_id: input.list.product_id, modelName: ProductModel.modelName }, mix_variants[j].keys)).price;
                        } catch {
                            normal_price = null;
                        }

                        const result = await PriceHelper.createVariantPrice({ model_id: normal_price.model_id, model_name: normal_price.model_name, model_variant_keys: mix_variants[j].keys }, { ...normal_price.toObject(), type: PriceModel.types.bag });
                        if (!result.price) {
                            console.log('failed to create price');
                        }
                        collection.list.price_id = result.price._id;
                    } catch { /* empty */ }
                }
            }
        }
        await collection.save();
    }
    // if (Array.isArray(input.list)) {
    //     for (let i = 0; i < input.list.length; i += 1) {
    //         const result = await PriceHelper.createPrice(input.list[i].price);
    //         if (result.price) {
    //             collection.list[i].price_id = result.price._id;
    //         }
    //     }
    //     await collection.save();
    // }

    const seo_result = await SEOHelper.attachSEO(collection, { ...(input?.extra_fields?.seo || {}), generate_url: input?.extra_fields?.title, model_name: CollectionModel.modelName });
    if (seo_result.seo) {
        collection.extra_fields.seo_id = seo_result.seo._id;
        await collection.save();
    }
    return seo_result.instance || collection;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { CollectionModel, MediaModel }, helpers: { ValidationHelper, SEOHelper, MediaHelper: { attachMedia } }, error_res, trans }) => {
    // find collection
    let collection;
    try {
        collection = await CollectionModel.findOne({ source: CollectionModel.sources.campaign, _id: args.id });
    } catch (e) {
        collection = null;
    }
    // check collection exists
    if (!collection)
        error_res(trans('not_found', { attr: "campaign_collection" }));

    // get input
    const input = collect(args.input).only(['type', 'condition', 'list', 'extra_fields']).all();
    try { input.condition = collect(input.condition).only(['model_name', 'limit', 'logic', 'orders', 'wheres']).all(); } catch { /* empty */ }
    try { input.condition.orders = collect(input.condition.orders).map((item) => { return collect(item).only(['type', 'field']).all(); }).all(); } catch { /* empty */ }
    try { input.condition.wheres = collect(input.condition.wheres).map((item) => { return collect(item).only(['operator', 'where_field', 'where_value']).all(); }).all(); } catch { /* empty */ }
    try { input.list = collect(input.list).map((item) => { return collect(item).only(['product_id', 'has_variant_key', 'mix_variant_keys', 'sort', 'show', 'expireAt']).all(); }).all(); } catch { /* empty */ }
    try { input.extra_fields = collect(input.extra_fields).only(['title', 'description', 'show', 'seo', 'media', 'startAt', 'expireAt', 'has_timer', 'cover', 'cover_position']).all(); } catch { /* empty */ }

    // validate input :
    const rules = {
        type: ['required', { in: Object.values(CollectionModel.types) }],
        condition: {
            model_name: 'string',
            limit: 'integer',
            logic: [`required_if:type,${CollectionModel.types.dynamic}`, { in: Object.values(CollectionModel.logics) }],
            'orders.*': {
                type: ['required', `in:${Object.values(CollectionModel.orders_types)}`],
                field: ['required', 'string'],
            },
            'wheres.*': {
                operator: ['required', `in:${Object.values(CollectionModel.wheres_operators)}`],
                where_field: ['required', 'string'],
                // 'where_value': "JSON", // todo: escape value in mongo
            }
        },
        'list.*': {
            product_id: ['required', 'exists:ProductModel,_id'],
            has_variant_key: ['boolean'],
            'mix_variant_keys.*': 'string',
            sort: 'integer',
            show: ['boolean'],
            expireAt: 'timestamp',
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
        }
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);
    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input?.extra_fields?.seo, { generate_url: collection.title, model_name: CollectionModel.modelName, seo_id: collection?.extra_fields?.seo_id });

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    if (input?.extra_fields?.title)
        input.extra_fields.title = await multilang_remove_extra_fields(input.extra_fields.title);
    if (input?.extra_fields?.description)
        input.extra_fields.description = await multilang_remove_extra_fields(input.extra_fields.description);

    // update collection
    const last_media_id = collection?.extra_fields?.media_id;
    const last_cover_id = collection?.extra_fields?.cover_id;
    await collection.set(input).save();
    // update media relation
    if (input?.extra_fields?.media_id)
        await attachMedia(collection, input?.extra_fields?.media_id, last_media_id);
    if (input?.extra_fields?.cover_id)
        await attachMedia(collection, input?.extra_fields?.cover_id, last_cover_id);

    const seo_result = await SEOHelper.attachSEO(collection, { ...(input?.extra_fields?.seo || {}), generate_url: input?.extra_fields?.title, model_name: CollectionModel.modelName });
    if (seo_result.seo) {
        collection.extra_fields.seo_id = seo_result.seo._id;
        await collection.save();
    }
    return seo_result.instance || collection;
};
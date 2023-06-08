const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { CollectionModel, MediaModel }, helpers: { ValidationHelper, SEOHelper, MediaHelper: { attachMedia } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['list', 'extra_fields']).all();
    try { input.list = collect(input.list).map((item) => { return collect(item).only(['product_id', 'has_variant_key', 'mix_variant_keys', 'sort', 'show', 'expireAt']).all(); }).all(); } catch { /* empty */ }
    try { input.extra_fields = collect(input.extra_fields).only(['title', 'description', 'show', 'seo', 'media', 'score', 'startAt', 'expireAt', 'has_timer', 'cover', 'cover_position']).all(); } catch { /* empty */ }
    input.user_id = AuthUser.id;
    input.type = CollectionModel.types.static;
    input.source = CollectionModel.sources.gift;

    // validate input :
    const rules = {
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
            score: 'integer',
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

    const seo_result = await SEOHelper.attachSEO(collection, { ...(input?.extra_fields?.seo || {}), generate_url: input?.extra_fields?.title, model_name: CollectionModel.modelName });
    if (seo_result.seo) {
        collection.extra_fields.seo_id = seo_result.seo._id;
        await collection.save();
    }
    return seo_result.instance || collection;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { CategoryModel, MediaModel }, helpers: { ValidationHelper, SEOHelper, MediaHelper: { attachMedia } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'active', 'sort', 'show_in_menu', 'description', 'type', 'parent_id', 'media', 'seo']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: multilang_rules(['required', 'string']),
        active: 'boolean',
        show_in_menu: 'boolean',
        description: multilang_rules(['string']),
        type: ['required', { in: Object.values(CategoryModel.types) }],
        sort: 'integer',
        parent_id: [{ 'exists': { model: CategoryModel, field: '_id' } }],
        media: {
            media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
            alt: ['string'],
            url: 'string',
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input.seo, { generate_url: input.title, model_name: CategoryModel.modelName });

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);

    // create category
    const category = await CategoryModel.create(input);
    // update media relation
    if (input?.media?.media_id)
        await attachMedia(category, input.media.media_id);
    const seo_result = await SEOHelper.attachSEO(category, { ...input.seo, generate_url: input.title, model_name: CategoryModel.modelName });
    return seo_result.instance || category;
};
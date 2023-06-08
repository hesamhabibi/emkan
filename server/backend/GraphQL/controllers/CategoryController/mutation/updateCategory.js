const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { CategoryModel, MediaModel }, helpers: { ValidationHelper, SEOHelper, MediaHelper: { attachMedia } }, error_res, trans }) => {
    // find category
    let category;
    try {
        category = await CategoryModel.findById(args.id);
    } catch (e) {
        category = null;
    }
    // check category exists
    if (!category)
        error_res(trans('not_found', { attr: "category" }));

    // get input
    const input = collect(args.input).only(['title', 'active', 'show_in_menu', 'description', 'type', 'sort', 'parent_id', 'media', 'seo']).all();

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        active: 'boolean',
        show_in_menu: 'boolean',
        description: await multilang_rules(['string']),
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
    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input.seo, category);

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);

    // update category
    const last_media_id = category?.media?.media_id;
    await category.set(input).save();
    // update media relation
    if (input?.media?.media_id)
        await attachMedia(category, input.media.media_id, last_media_id);
    const seo_result = await SEOHelper.attachSEO(category, { ...input.seo, generate_url: input.title, model_name: CategoryModel.modelName });
    return seo_result.instance || category;
};
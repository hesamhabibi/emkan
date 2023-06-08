const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { BrandModel, MediaModel }, helpers: { ValidationHelper, SEOHelper, MediaHelper: { attachMedia } }, error_res, trans }) => {
    // find brand
    let brand;
    try {
        brand = await BrandModel.findById(args.id);
    } catch (e) {
        brand = null;
    }
    // check brand exists
    if (!brand)
        error_res(trans('not_found', { attr: "brand" }));

    // get input
    const input = collect(args.input).only(['title', 'active', 'show_in_menu', 'description', 'media', 'seo']).all();

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        active: 'boolean',
        show_in_menu: 'boolean',
        description: await multilang_rules(['string']),
        media: {
            media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
            alt: ['string'],
            url: 'string',
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);
    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input.seo, brand);

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);

    // update brand
    const last_media_id = brand?.media?.media_id;
    await brand.set(input).save();
    // update media relation
    if (input?.media?.media_id)
        await attachMedia(brand, input.media.media_id, last_media_id);
    const seo_result = await SEOHelper.attachSEO(brand, { ...input.seo, generate_url: input.title, model_name: BrandModel.modelName });
    return seo_result.instance || brand;
};
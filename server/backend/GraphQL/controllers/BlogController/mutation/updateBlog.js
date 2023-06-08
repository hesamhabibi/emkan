const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { BlogModel }, helpers: { ValidationHelper, SEOHelper, MediaHelper: { attachMedia, prepareMediaGallery } }, error_res, trans }) => {
    // find blog
    let blog;
    try {
        blog = await BlogModel.findById(args.id);
    } catch (e) {
        blog = null;
    }
    // check blog exists
    if (!blog)
        error_res(trans('not_found', { attr: "blog" }));

    // get input
    const input = collect(args.input).only(['title', 'summary', 'description', 'status', 'publishAt', 'has_rating', 'has_comment', 'is_special', 'type', 'category_id', 'media_gallery', 'document', 'seo', 'tag_ids', 'tag_group_id']).all();

    // validate input :
    const rules = {
        title: await multilang_rules(['string'], 'web', ['required', 'string']),
        summary: await multilang_rules(['string']),
        description: await multilang_rules(['string']),
        status: ['required', { in: Object.values(BlogModel.statuses) }],
        publishAt: 'timestamp',
        has_rating: ['required', 'boolean'],
        has_comment: ['required', 'boolean'],
        is_special: ['boolean'],
        // type: ['required', { in: Object.values(BlogModel.types) }],
        category_id: ['exists:CategoryModel,_id'],
        'media_gallery.*': {
            media_id: ['exists:MediaModel,_id'],
            sort: 'integer',
            alt: ['string'],
            url: 'string',
        },
        document: {
            media_id: ['exists:MediaModel,_id'],
            alt: ['string'],
            url: 'string',
        },
        'tag_ids.*': ['exists:TagModel,_id'],
        tag_group_id: ['exists:TagModel,_id'],
    };

    const seo_unique_key = String(blog.type);

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);
    const { validation_result: seo_validation_result } = await SEOHelper.validate_input(input.seo, { generate_url: blog.title, model_name: BlogModel.modelName, unique_key: seo_unique_key, seo_id: blog.seo_id });

    // check validation
    if (!validation_result.pass || !seo_validation_result.pass) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...seo_validation_result.errors });
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.summary = await multilang_remove_extra_fields(input.summary);
    input.description = await multilang_remove_extra_fields(input.description);

    // add default value for publishAt
    if (!input.publishAt) {
        input.publishAt = Date.now();
    }

    // prepare media_gallery
    const result = await prepareMediaGallery(input.media_gallery, blog, blog.media_gallery);
    input.media_gallery = result.media_gallery;
    input.media = result.main_media;

    // update blog
    const last_document_id = blog?.document?.media_id;
    await blog.set(input).save();
    // update media relation
    for (let i = 0; i < input.media_gallery.length; i += 1) {
        try {
            await attachMedia(blog, input.media_gallery[i].media_id);
        } catch {
            console.log('error in update media relation');
        }
    }
    if (input?.document?.media_id)
        await attachMedia(blog, input?.document?.media_id, last_document_id);

    const seo_result = await SEOHelper.attachSEO(blog, { ...input.seo, generate_url: input.title, model_name: BlogModel.modelName });
    return seo_result.instance || blog;
};
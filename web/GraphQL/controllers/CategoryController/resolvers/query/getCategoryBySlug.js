module.exports = async (parent, args, { models: { CategoryModel, SEOModel }, error_res, trans }) => {
    let seo;
    const slug = args.slug;
    try {
        seo = await SEOModel.findOne({ url: slug });
    } catch (e) {
        seo = null;
    }

    // check seo exists
    if (!seo)
        error_res(trans('not_found', { attr: 'category' }), null, process.env.ERROR_CODE_NOTFOUND);

    // find category
    let category;
    try {
        if (args.type)
            category = await CategoryModel.findOne({ seo_id: seo._id, active: true, type: args.type ?? CategoryModel.types.blog });
        else
            category = await CategoryModel.findOne({ seo_id: seo._id, active: true });
    } catch (e) {
        category = null;
    }

    // check category exists
    if (!category)
        error_res(trans('not_found', { attr: 'category' }), null, process.env.ERROR_CODE_NOTFOUND);

    return category;
};

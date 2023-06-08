module.exports = async (parent, args, { models: { BlogModel, SEOModel }, error_res, trans }) => {
    let seo;
    try {
        seo = await SEOModel.findOne({ url: args.slug });
    } catch (e) {
        seo = null;
    }

    // check seo exists
    if (!seo)
        error_res(trans('not_found', { attr: 'blog' }), null, process.env.ERROR_CODE_NOTFOUND);

    // find blog
    let blog;
    try {
        blog = await BlogModel.findOne({
            seo_id: seo._id,
            status: BlogModel.statuses.show,
            publishAt: { $lt: new Date() },
            type: args.type ?? BlogModel.types.blog,
        });
    } catch {
        blog = null;
    }

    // check blog exists
    if (!blog)
        error_res(trans('not_found', { attr: 'blog' }), null, process.env.ERROR_CODE_NOTFOUND);

    return blog;
};

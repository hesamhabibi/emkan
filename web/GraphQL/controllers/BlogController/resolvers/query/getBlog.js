module.exports = async (parent, args, { models: { BlogModel }, error_res, trans }) => {
    // find blog
    let blog;
    try {
        blog = await BlogModel.findOne({
            _id: args.blog_id,
            status: BlogModel.statuses.show,
            publishAt: { $lt: new Date() }
        });
    } catch (e) {
        blog = null;
    }

    // check blog exists
    if (!blog)
        error_res(trans('not_found', { attr: 'blog' }), null, process.env.ERROR_CODE_NOTFOUND);

    return blog;
};

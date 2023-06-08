module.exports = async (parent, args, { models: { BlogModel }, error_res, trans }) => {
    // find blog
    let blog;
    try {
        blog = await BlogModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        blog = null;
    }
    // check blog exists
    if (!blog)
        error_res(trans('not_found', { attr: "blog" }));
    return blog;
};
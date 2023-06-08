module.exports = async (parent, args, { models: { BlogModel }, helpers: { SEOHelper, MediaHelper }, error_res, trans }) => {
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
    // delete blog
    await SEOHelper.deleteSEO(blog.seo_id);
    await MediaHelper.prepareMediaGallery(null, blog, blog.media_gallery);
    await MediaHelper.detachMedia(blog, blog.document.media_id);

    await blog.delete();
    return { success: true, message: trans('done') };
};
module.exports = async (parent, args, { models: { CategoryModel }, helpers: { SEOHelper, MediaHelper }, error_res, trans }) => {
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
    // delete category
    await SEOHelper.deleteSEO(category.seo_id);
    await MediaHelper.detachMedia(category, category.media.media_id);
    await category.delete();
    return { success: true, message: trans('done') };
};
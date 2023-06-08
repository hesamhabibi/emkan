module.exports = async (parent, args, { models: { BrandModel }, helpers: { SEOHelper, MediaHelper }, error_res, trans }) => {
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
    // delete brand
    await SEOHelper.deleteSEO(brand.seo_id);
    await MediaHelper.detachMedia(brand, brand.media.media_id);

    await brand.delete();
    return { success: true, message: trans('done') };
};
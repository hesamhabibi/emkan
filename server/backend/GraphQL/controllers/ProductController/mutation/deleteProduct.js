module.exports = async (parent, args, { models: { ProductModel }, helpers: { SEOHelper, MediaHelper }, error_res, trans }) => {
    // find product
    let product;
    try {
        product = await ProductModel.findById(args.id);
    } catch (e) {
        product = null;
    }
    // check product exists
    if (!product)
        error_res(trans('not_found', { attr: "product" }));
    // delete product
    await SEOHelper.deleteSEO(product.seo_id); // todo: delete prices if needed
    await MediaHelper.prepareMediaGallery(null, product, product.media_gallery);
    await MediaHelper.detachMedia(product, product.video?.media_id);
    for (let i in product.files) {
        await MediaHelper.detachMedia(product, product.files[i]?.media_id);
    }
    for (let i in product.mix_variant) {
        await MediaHelper.prepareMediaGallery(null, product, product.mix_variant[i]?.media_gallery);
    }

    await product.delete();
    return { success: true, message: trans('done') };
};
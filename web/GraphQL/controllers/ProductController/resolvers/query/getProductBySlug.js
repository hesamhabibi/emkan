module.exports = async (parent, args, { models: { ProductModel, SEOModel }, error_res, trans }) => {
    // find seo
    let seo;
    const slug = args.slug;
    try {
        seo = await SEOModel.findOne({ url: slug });
    } catch (e) {
        seo = null;
    }

    // check seo exists
    if (!seo)
        error_res(trans('not_found', { attr: 'product' }), null, process.env.ERROR_CODE_NOTFOUND);

    // find product
    let product;
    try {
        product = await ProductModel.findOne({
            seo_id: seo._id,
            status: ProductModel.statuses.show,
            publishAt: { $lt: new Date() },
            type: args.type ?? ProductModel.types.product,
        });
    } catch (e) {
        product = null;
    }

    if (!product)
        error_res(trans('not_found', { attr: 'product' }), null, process.env.ERROR_CODE_NOTFOUND);

    return product;
};

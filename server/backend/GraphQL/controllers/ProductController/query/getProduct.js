module.exports = async (parent, args, { models: { ProductModel }, error_res, trans }) => {
    // find product
    let product;
    try {
        product = await ProductModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        product = null;
    }
    // check product exists
    if (!product)
        error_res(trans('not_found', { attr: "product" }));
    return product;
};
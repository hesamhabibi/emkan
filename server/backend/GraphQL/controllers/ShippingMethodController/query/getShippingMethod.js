module.exports = async (parent, args, { models: { ShippingMethodModel }, error_res, trans }) => {
    // find shipping_method
    let shipping_method;
    try {
        shipping_method = await ShippingMethodModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        shipping_method = null;
    }
    // check shipping_method exists
    if (!shipping_method)
        error_res(trans('not_found', { attr: "shipping_method" }));
    return shipping_method;
};
module.exports = async (parent, args, { models: { ShippingMethodModel }, error_res, trans }) => {
    // find shipping_method
    let shipping_method;
    try {
        shipping_method = await ShippingMethodModel.findOne({ _id: args.id, is_main: { $ne: true } });
    } catch (e) {
        shipping_method = null;
    }
    // check shipping_method exists
    if (!shipping_method)
        error_res(trans('not_found', { attr: "shipping_method" }));

    await shipping_method.delete();
    return { success: true, message: trans('done') };
};
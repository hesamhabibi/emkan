module.exports = async (parent, args, { models: { SettingModel, ShippingMethodModel, OrderModel, AddressModel }, error_res, trans, AuthUser }) => {
    // find setting
    let setting = null;
    try {
        setting = await SettingModel.findByKey('shipping_methods');
    } catch (e) {
        setting = null;
    }

    // check setting exists
    if (!setting)
        error_res(trans('not_found', { attr: 'setting' }));

    let cart;
    try {
        cart = await OrderModel.findOne({ user_id: AuthUser._id, type: OrderModel.types.cart, is_inquiry: false });
    } catch {
        cart = null;
    }

    if (!cart)
        return [];

    let address;
    try {
        address = await AddressModel.findOne({ model_id: AuthUser._id, is_default: true });
    } catch (e) {
        address = null;
    }

    if (!address)
        return [];

    let prices = await cart.calculate_sum();

    const shipping_methods = [];
    for (let i in setting.value) {
        try {
            const shipping_method = await ShippingMethodModel.findById(setting.value[i].shipping_method_id);
            if (shipping_method) {
                const result = await cart.calculate_post_price(shipping_method._id, address._id, prices.total_weight, prices.total_price_with_discount);
                if (result.is_active)
                    shipping_methods.push({ ...shipping_method.toObject(), price: result.post_price });
            }
        } catch {/* empty */ }
    }

    return shipping_methods;
};
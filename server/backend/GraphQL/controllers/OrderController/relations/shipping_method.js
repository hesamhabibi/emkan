module.exports = async (parent, args, { models: { ShippingMethodModel } }) => {
    try {
        return await ShippingMethodModel.findOne({ _id: parent.shipping_method_id });
    } catch (e) {
        return null;
    }
};
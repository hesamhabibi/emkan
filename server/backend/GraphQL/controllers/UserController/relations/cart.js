module.exports = async (parent, args, { models: { OrderModel } }) => {
    try {
        return await OrderModel.findOne({ user_id: parent._id, is_inquiry: false, type: OrderModel.types.cart });
    } catch (e) {
        return null;
    }
};
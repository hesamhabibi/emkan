module.exports = async (parent, args, { models: { OrderModel } }) => {
    try {
        return await OrderModel.find({ user_id: parent._id, is_inquiry: false, type: OrderModel.types.complete });
    } catch (e) {
        return [];
    }
};
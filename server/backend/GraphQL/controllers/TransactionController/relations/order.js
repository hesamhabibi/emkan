module.exports = async (parent, args, { models: { OrderModel } }) => {
    try {
        return await OrderModel.findOne({ _id: parent.order_id });
    } catch (e) {
        return null;
    }
};
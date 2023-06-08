module.exports = async (parent, args, { models: { OrderModel } }) => {
    try {
        if (parent.type == OrderModel.types.cart)
            return await parent.calculate_sum();
        else
            return parent.total_prices;
    } catch (e) {
        return null;
    }
};
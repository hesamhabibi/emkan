module.exports = async (parent, args, { models: { PriceModel } }) => {
    try {
        const price = await PriceModel.findById(parent.price_id);
        // todo: price for cart
        return price;
    } catch (e) {
        return null;
    }
};
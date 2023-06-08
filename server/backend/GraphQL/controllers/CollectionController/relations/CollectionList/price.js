module.exports = async (parent, args, { models: { PriceModel } }) => {
    try {
        return await PriceModel.findOne({ _id: parent.price_id });
    } catch (e) {
        return null;
    }
};
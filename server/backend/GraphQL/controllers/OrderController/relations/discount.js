module.exports = async (parent, args, { models: { DiscountModel } }) => {
    try {
        return await DiscountModel.findOne({ _id: parent.discount_id });
    } catch (e) {
        return null;
    }
};
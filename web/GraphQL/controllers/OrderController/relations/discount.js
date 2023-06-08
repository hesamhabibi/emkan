module.exports = async (parent, args, { models: { DiscountModel } }) => {
    try {
        return await DiscountModel.findById(parent.discount_id);
    } catch (e) {
        return null;
    }
};
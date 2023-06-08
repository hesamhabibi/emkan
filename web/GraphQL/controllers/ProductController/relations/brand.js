module.exports = async (parent, args, { models: { BrandModel } }) => {
    try {
        return await BrandModel.findOne({ _id: parent.brand_id });
    } catch (e) {
        return null;
    }
};
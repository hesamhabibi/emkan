module.exports = async (parent, args, { models: { BrandModel } }) => {
    try {
        return await BrandModel.find({ user_id: parent._id });
    } catch (e) {
        return [];
    }
};
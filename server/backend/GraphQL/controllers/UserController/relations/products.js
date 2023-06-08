module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        return await ProductModel.find({ user_id: parent._id });
    } catch (e) {
        return [];
    }
};
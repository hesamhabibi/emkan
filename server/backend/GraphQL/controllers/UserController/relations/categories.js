module.exports = async (parent, args, { models: { CategoryModel } }) => {
    try {
        return await CategoryModel.find({ user_id: parent._id });
    } catch (e) {
        return [];
    }
};
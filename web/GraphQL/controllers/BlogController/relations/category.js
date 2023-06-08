module.exports = async (parent, args, { models: { CategoryModel } }) => {
    try {
        return await CategoryModel.findById(parent.category_id);
    } catch (e) {
        return null;
    }
};
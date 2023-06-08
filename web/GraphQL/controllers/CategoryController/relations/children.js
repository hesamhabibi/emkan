module.exports = async (parent, args, { models: { CategoryModel } }) => {
    try {
        return await CategoryModel.find({ parent_id: parent.id });
    } catch (e) {
        return [];
    }
};
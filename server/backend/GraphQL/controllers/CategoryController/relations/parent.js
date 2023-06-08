module.exports = async (parent, args, { models: { CategoryModel } }) => {
    try {
        return await CategoryModel.findOne({ _id: parent.parent_id });
    } catch (e) {
        return null;
    }
};
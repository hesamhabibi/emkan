module.exports = async (parent, args, { models: { BlogModel } }) => {
    try {
        return await BlogModel.find({ category_id: parent._id });
    } catch (e) {
        return [];
    }
};
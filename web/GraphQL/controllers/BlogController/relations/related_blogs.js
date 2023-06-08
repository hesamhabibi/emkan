module.exports = async (parent, args, { models: { BlogModel } }) => {
    try {
        return BlogModel.find({ type: parent.type, category_id: parent.category_id, _id: { $ne: parent._id } });
    } catch (e) {
        return [];
    }
};
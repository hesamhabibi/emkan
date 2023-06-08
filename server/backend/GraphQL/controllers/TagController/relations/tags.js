module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        return await TagModel.find({ tag_group_ids: parent._id });
    } catch (e) {
        return [];
    }
};
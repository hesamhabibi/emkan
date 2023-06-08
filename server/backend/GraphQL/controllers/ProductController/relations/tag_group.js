module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        return await TagModel.find({ _id: parent.tag_group_id });
    } catch (e) {
        return [];
    }
};
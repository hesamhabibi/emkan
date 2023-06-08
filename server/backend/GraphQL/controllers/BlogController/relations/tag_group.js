module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        return await TagModel.findOne({ _id: parent.tag_group_ids });
    } catch (e) {
        return null;
    }
};
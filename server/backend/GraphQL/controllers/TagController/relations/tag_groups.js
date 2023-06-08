module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        return await TagModel.find({ _id: { "$in": parent.tag_group_ids } });
    } catch (e) {
        return [];
    }
};
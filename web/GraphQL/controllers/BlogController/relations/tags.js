module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        if (parent.tag_group_id) {
            return await TagModel.find({
                $and: [
                    {
                        $or: [
                            { _id: { $in: parent.tag_ids } },
                            { tag_group_ids: parent.tag_group_id },
                        ]
                    },
                    { deep: TagModel.deeps.tag }
                ]
            });
        } else {
            return await TagModel.find({ _id: { $in: parent.tag_ids }, deep: TagModel.deeps.tag });
        }
    } catch (e) {
        return null;
    }
};
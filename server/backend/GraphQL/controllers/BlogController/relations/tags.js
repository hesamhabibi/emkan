module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        return await TagModel.find({
            "or": [
                { _id: { '$in': parent.tag_ids || [] } }, // direct relation
                { tag_group_id: { '$in': parent.tag_group_ids || [] } }, // through tagGroup
            ]
        });
    } catch (e) {
        return [];
    }
};
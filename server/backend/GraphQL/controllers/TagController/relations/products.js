module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        return await ProductModel.find({
            "$or": [
                { tag_ids: parent._id },
                { tag_group_ids: parent.tag_group_id },
            ]
        });
    } catch (e) {
        return [];
    }
};
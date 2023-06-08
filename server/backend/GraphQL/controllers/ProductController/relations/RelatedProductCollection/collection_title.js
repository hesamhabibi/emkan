module.exports = async (parent, args, { models: { CollectionModel } }) => {
    try {
        return (await CollectionModel.findOne({ _id: parent.collection_id })).extra_fields.title;
    } catch (e) {
        return null;
    }
};
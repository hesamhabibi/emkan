module.exports = async (parent, args, { models: { CollectionModel } }) => {
    try {
        return await CollectionModel.findOne({ _id: parent.collection_id });
    } catch (e) {
        return null;
    }
};
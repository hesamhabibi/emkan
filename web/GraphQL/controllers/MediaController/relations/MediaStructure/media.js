module.exports = async (parent, args, { models: { MediaModel } }) => {
    try {
        return await MediaModel.findOne({ _id: parent.media_id });
    } catch (e) {
        return null;
    }
};
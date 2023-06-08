module.exports = async (parent, args, { models: { MediaModel } }) => {
    try {
        return await MediaModel.find({ user_id: parent._id });
    } catch (e) {
        return [];
    }
};
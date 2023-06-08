module.exports = async (parent, args, { models: { CommentModel } }) => {
    try {
        return await CommentModel.find({ reply_to_id: parent._id });
    } catch (e) {
        return null;
    }
};
module.exports = async (parent, args, { models: { CommentModel } }) => {
    try {
        return await CommentModel.findOne({ _id: parent.reply_to_id });
    } catch (e) {
        return null;
    }
};
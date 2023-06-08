module.exports = async (parent, args, { models: { CommentModel } }) => {
    try {
        return await CommentModel.find({ model_name: 'BlogModel', model_type: parent.type, model_id: parent._id });
    } catch (e) {
        return null;
    }
};
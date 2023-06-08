module.exports = async (parent, args, { models: { CommentModel } }) => {
    try {
        return await CommentModel.find({ model_name: 'ProductModel', model_type: parent.type, model_id: parent._id, confirmed: true }).sort({ 'createdAt': -1 });
    } catch (e) {
        return null;
    }
};
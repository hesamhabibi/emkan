module.exports = async (parent, args, { models: { CommentModel } }) => {
    try {
        return await CommentModel.find({ model_name: 'ProductModel', model_type: -1, model_id: parent._id });
    } catch (e) {
        return null;
    }
};
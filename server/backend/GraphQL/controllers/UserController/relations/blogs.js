module.exports = async (parent, args, { models: { BlogModel } }) => {
    try {
        return await BlogModel.find({ user_id: parent._id });
    } catch (e) {
        return [];
    }
};
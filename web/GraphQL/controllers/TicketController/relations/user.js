module.exports = async (parent, args, { models: { UserModel } }) => {
    try {
        return await UserModel.findById(parent.user_id);
    } catch (e) {
        return null;
    }
};
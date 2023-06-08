module.exports = async (parent, args, { models: { UserModel } }) => {
    try {
        return await UserModel.findOne({ _id: parent.user_id });
    } catch (e) {
        return null;
    }
};
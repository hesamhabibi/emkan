module.exports = async (parent, args, { models: { UserModel } }) => {
    // todo: find user by mobile or email
    try {
        return await UserModel.findOne({ _id: parent.receiver_user_id });
    } catch (e) {
        return null;
    }
};
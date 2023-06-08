module.exports = async (parent, args, { models: { UserModel } }) => {
    try {
        return await UserModel.find({ _id: { "$in": parent.user_access_ids } });
    } catch (e) {
        return null;
    }
};
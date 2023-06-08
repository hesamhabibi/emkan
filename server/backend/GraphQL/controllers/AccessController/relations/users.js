module.exports = async (parent, args, { models: { UserModel } }) => {
    try {
        return await UserModel.find({ access_id: parent._id });
    } catch (e) {
        return [];
    }
};
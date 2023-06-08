module.exports = async (parent, args, { models: { UserModel } }) => {
    try {
        return await UserModel.find({ access_id: parent.access_id });
    } catch (e) {
        return [];
    }
};
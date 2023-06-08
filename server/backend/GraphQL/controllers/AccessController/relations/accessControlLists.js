module.exports = async (parent, args, { models: { AccessControlListModel } }) => {
    try {
        return await AccessControlListModel.find({ access_id: parent._id });
    } catch (e) {
        return [];
    }
};
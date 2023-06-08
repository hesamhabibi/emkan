module.exports = async (parent, args, { models: { AccessControlListModel } }) => {
    try {
        return await AccessControlListModel.find({ access_id: parent.access_id_id });
    } catch (e) {
        return [];
    }
};
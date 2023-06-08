module.exports = async (parent, args, { models: { AccessControlListModel } }) => {
    try {
        return await AccessControlListModel.find({ access_component_id: parent._id });
    } catch (e) {
        // console.log(e);
        return [];
    }
};
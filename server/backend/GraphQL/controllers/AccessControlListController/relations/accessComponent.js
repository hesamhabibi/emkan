module.exports = async (parent, args, { models: { AccessComponentModel } }) => {
    try {
        return await AccessComponentModel.findOne({ _id: parent.access_component_id });
    } catch (e) {
        return null;
    }
};
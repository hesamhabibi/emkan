module.exports = async (parent, args, { models: { AccessComponentModel } }) => {
    try {
        return await AccessComponentModel.findOne({ _id: parent.parent_id });
    } catch (e) {
        // console.log(e);
        return null;
    }
};
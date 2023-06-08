module.exports = async (parent, args, { models: { AccessComponentModel } }) => {
    try {
        return await AccessComponentModel.find({ parent_id: parent._id });
    } catch (e) {
        // console.log(e);
        return [];
    }
};
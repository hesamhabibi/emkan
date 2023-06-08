module.exports = async (parent, args, { models: { AttributeModel } }) => {
    try {
        return await AttributeModel.find({ attribute_ids: parent._id });
    } catch (e) {
        return [];
    }
};
module.exports = async (parent, args, { models: { AttributeValueModel } }) => {
    try {
        return await AttributeValueModel.find({ attribute_id: parent._id });
    } catch (e) {
        return [];
    }
};
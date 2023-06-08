module.exports = async (parent, args, { models: { AttributeValueModel } }) => {
    try {
        return await AttributeValueModel.findOne({ _id: parent.attribute_value_id });
    } catch (e) {
        return null;
    }
};
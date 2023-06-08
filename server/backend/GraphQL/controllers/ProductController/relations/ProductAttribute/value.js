module.exports = async (parent, args, { models: { AttributeValueModel } }) => {
    try {
        const attribute_value = await AttributeValueModel.findOne({ _id: parent.attribute_value_id });
        return attribute_value.value;
    } catch (e) {
        return null;
    }
}
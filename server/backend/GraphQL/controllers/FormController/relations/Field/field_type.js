module.exports = async (parent, args, { models: { FieldTypeModel } }) => {
    try {
        return await FieldTypeModel.findOne({ _id: parent.field_type_id });
    } catch (e) {
        return null;
    }
};
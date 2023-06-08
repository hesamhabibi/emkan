module.exports = async (parent, args, { models: { FieldValidationModel } }) => {
    try {
        return await FieldValidationModel.find({ _id: { "$in": parent.field_validation_ids } });
    } catch (e) {
        return [];
    }
};
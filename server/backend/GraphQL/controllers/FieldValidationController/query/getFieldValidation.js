module.exports = async (parent, args, { models: { FieldValidationModel }, error_res, trans }) => {
    // find field_validation
    let field_validation;
    try {
        field_validation = await FieldValidationModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        field_validation = null;
    }
    // check field_validation exists
    if (!field_validation)
        error_res(trans('not_found', { attr: "field_validation" }));
    return field_validation;
};
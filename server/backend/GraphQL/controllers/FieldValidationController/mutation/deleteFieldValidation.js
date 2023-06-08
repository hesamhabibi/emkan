module.exports = async (parent, args, { models: { FieldValidationModel }, error_res, trans }) => {
    // find field_validation
    let field_validation;
    try {
        field_validation = await FieldValidationModel.findById(args.id);
    } catch (e) {
        field_validation = null;
    }
    // check field_validation exists
    if (!field_validation)
        error_res(trans('not_found', { attr: "field_validation" }));
    // delete field_validation
    await field_validation.delete();
    return { success: true, message: trans('done') };
};
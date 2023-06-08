module.exports = async (parent, args, { models: { FieldTypeModel }, error_res, trans }) => {
    // find field_type
    let field_type;
    try {
        field_type = await FieldTypeModel.findById(args.id);
    } catch (e) {
        field_type = null;
    }
    // check field_type exists
    if (!field_type)
        error_res(trans('not_found', { attr: "field_type" }));
    // delete field_type
    await field_type.delete();
    return { success: true, message: trans('done') };
};
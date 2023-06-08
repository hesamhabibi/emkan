const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { FieldTypeModel }, helpers: { ValidationHelper }, error_res, trans }) => {
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

    // get input
    const input = collect(args.input).only(['title', 'type', 'has_data', 'field_validation_ids']).all();

    // validate input :
    const rules = {
        title: 'required',
        type: 'required',
        has_data: ['required', 'boolean'],
        'field_validation_ids.*': ['required', 'exists:FieldValidationModel,_id'],

    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update field_type
    await field_type.set(input).save();
    return field_type;
};
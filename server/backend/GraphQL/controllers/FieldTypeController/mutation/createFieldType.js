const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { FieldTypeModel }, helpers: { ValidationHelper }, error_res, trans }) => {

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

    // create field_type
    let field_type;
    field_type = await FieldTypeModel.create(input);
    return field_type;
};
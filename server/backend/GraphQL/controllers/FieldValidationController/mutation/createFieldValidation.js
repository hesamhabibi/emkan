const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { FieldValidationModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['title', 'validation_rule']).all();

    // validate input :
    const rules = {
        title: 'required|string',
        validation_rule: 'required|string',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // create field_validation
    let field_validation;
    field_validation = await FieldValidationModel.create(input);
    return field_validation;
};
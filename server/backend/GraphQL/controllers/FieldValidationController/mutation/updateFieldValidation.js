const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { FieldValidationModel }, helpers: { ValidationHelper }, error_res, trans }) => {
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

    // get input
    const input = collect(args.input).only(['title', 'validation_rule']).all();

    // validate input :
    const rules = {
        title: 'required',
        validation_rule: 'required|string',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update field_validation
    await field_validation.set(input).save();
    return field_validation;
};
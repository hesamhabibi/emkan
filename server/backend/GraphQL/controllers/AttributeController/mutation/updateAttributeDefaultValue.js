const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AttributeModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find attribute
    let attribute;
    try {
        attribute = await AttributeModel.findById(args.id);
    } catch (e) {
        attribute = null;
    }
    // check attribute exists
    if (!attribute)
        error_res(trans('not_found', { attr: "attribute" }));

    // get input
    const input = collect(args).only(['default_attribute_value_id']).all();

    // validate input :
    const rules = {
        default_attribute_value_id: ['required', 'exists:AttributeValueModel,_id'],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update attribute
    await attribute.update(input);
    return attribute;
};
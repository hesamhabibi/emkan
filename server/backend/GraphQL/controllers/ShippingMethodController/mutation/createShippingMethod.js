const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { ShippingMethodModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'description', 'admin_description', 'is_default', 'status', 'weight_sensitivity', 'conditions', 'attributes']).all();
    try { input.conditions = collect(input.conditions).map((item) => { return collect(item).only(['type', 'operator', 'value']).all(); }).all(); } catch { /* empty */ }
    try { input.attributes = collect(input.attributes).map((item) => { return collect(item).only(['operator', 'from_weight', 'to_weight']).all(); }).all(); } catch { /* empty */ }
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: await multilang_rules(['string'], 'web', ['required', 'string']),
        description: await multilang_rules(['string']),
        admin_description: ['string'],
        is_default: ['boolean'],
        status: ['required', { in: Object.values(ShippingMethodModel.statuses) }],
        weight_sensitivity: ["required", "boolean"],
        "conditions.*": {
            type: [`in:${Object.values(ShippingMethodModel.conditions_types)}`],
            operator: [`in:${Object.values(ShippingMethodModel.conditions_operators)}`],
            // value: 'JSON',
        },
        "attributes.*": {
            operator: ['required', "integer"],
            from_weight: ["integer"],
            to_weight: ["integer"],
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);

    // create shipping_methods
    const shipping_methods = await ShippingMethodModel.create(input);


    return shipping_methods;
};
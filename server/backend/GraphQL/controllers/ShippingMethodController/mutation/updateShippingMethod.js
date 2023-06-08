const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { ShippingMethodModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find shipping_method
    let shipping_method;
    try {
        shipping_method = await ShippingMethodModel.findById(args.id);
    } catch (e) {
        shipping_method = null;
    }
    // check shipping_method exists
    if (!shipping_method)
        error_res(trans('not_found', { attr: "shipping_method" }));

    // get input
    const input = collect(args.input).only(['title', 'description', 'admin_description', 'is_default', 'status', 'weight_sensitivity', 'conditions', 'attributes']).all();
    try { input.conditions = collect(input.conditions).map((item) => { return collect(item).only(['type', 'operator', 'value']).all(); }).all(); } catch { /* empty */ }
    try { input.attributes = collect(input.attributes).map((item) => { return collect(item).only(['operator', 'from_weight', 'to_weight']).all(); }).all(); } catch { /* empty */ }

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

    // update shipping_method
    await shipping_method.set(input).save();

    return shipping_method;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');


module.exports = async (parent, args, { models: { DiscountModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find discount
    let discount;
    try {
        discount = await DiscountModel.findById(args.id);
    } catch (e) {
        discount = null;
    }
    // check discount exists
    if (!discount)
        error_res(trans('not_found', { attr: "discount" }));

    // get input
    const input = collect(args.input).only(['title', 'code', 'status', 'type', 'value', 'min_price', 'max_price', 'startAt', 'expireAt', 'settings']).all();
    try { input.settings.use_limit = collect(input.settings.use_limit).only(['type', 'count']).all(); } catch { /* empty */ }
    try { input.settings.condition = collect(input.settings.condition).only(['type', 'values']).all(); } catch { /* empty */ }
    try { input.settings.access = collect(input.settings.access).only(['type', 'values']).all(); } catch {/* empty */ }

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        code: ['required', 'string'],
        status: ['required', { in: Object.values(DiscountModel.statuses) }],
        type: ['required', { in: Object.values(DiscountModel.types) }],
        value: ['required', 'integer'],
        min_price: ['integer'],
        max_price: ['integer'],
        startAt: ['timestamp'],
        expireAt: ['timestamp'],
        settings: {
            use_limit: {
                type: [{ in: Object.values(DiscountModel.use_limit_types) }],
                count: ['integer'],
            },
            condition: {
                type: [{ in: Object.values(DiscountModel.condition_types) }],
                'values.*': ['string'],
            },
            access: {
                type: [{ in: Object.values(DiscountModel.access_types) }],
                'values.*': ['string'],
            }
        }
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);

    // update discount
    await discount.set(input).save();

    return discount;
};
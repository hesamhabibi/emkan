const Validatorjs = require('validatorjs');

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
    const input = { status: args.status };

    // validate input :
    const rules = {
        status: ['required', { in: Object.values(DiscountModel.statuses) }],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update discount
    await discount.set(input).save();

    return discount;
};
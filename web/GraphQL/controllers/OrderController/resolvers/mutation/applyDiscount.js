const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { OrderModel, DiscountModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // get input
    const input = collect(args).only(['discount_code']).all();

    // validate input :
    const rules = {
        // discount_code: 'required',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    let order;
    let discount;
    let error;
    try {
        order = await OrderModel.findOne({
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: false,
        });
        const prices = await order.calculate_sum();
        discount = await DiscountModel.findOne({ code: input.discount_code });
        const calculate_discount_result = await order.calculate_discount(discount?._id, prices.sum_product_price);
        if (!calculate_discount_result.success) {
            error = calculate_discount_result.error;
        }
        console.log (calculate_discount_result);
    } catch {
        error = 'خطا';
    }

    // if (!discount) {
    //     return error_res(trans('not_found', { attr: 'discount_code' }), process.env.ERROR_CODE_NOTFOUND);
    // }

    if (error) {
        return error_res(error, process.env.ERROR_CODE_NOTFOUND);
    }

    await order.set({
        discount_id: discount?._id,
    }).save();

    return order;
};
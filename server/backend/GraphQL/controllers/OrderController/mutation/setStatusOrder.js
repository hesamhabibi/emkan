const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { OrderModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find order
    let order;
    try {
        order = await OrderModel.findById(args.id);
    } catch (e) {
        order = null;
    }
    // check order exists
    if (!order)
        error_res(trans('not_found', { attr: "order" }));

    // get input
    const input = collect(args.input).only(['status', 'send_with']).all();

    // validate input :
    const rules = {
        status: ['required', 'integer'],
        send_with: ['required', 'integer'],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // todo: send sms

    // update order
    await order.set(input).save();

    return order;
};
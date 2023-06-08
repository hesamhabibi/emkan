const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { get_setting } = require('@helpers/SettingHelper');
const { send_email_html } = require('@helpers/EmailHelper');
const { create_transaction } = require('@helpers/PaymentHelper');

module.exports = async (parent, args, { models: { OrderModel, ShippingMethodModel, ProductModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // find order
    let order;
    try {
        order = await OrderModel.findOne({
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: args.input.is_inquiry,
        });
    } catch (e) {
        order = null;
    }
    // check order exists
    if (!order)
        error_res(trans('not_found', { attr: 'order' }));

    // // find payment_gateways
    // let payment_gateways;
    // try {
    //     payment_gateways = (await get_setting('payment_gateways')).value || [];
    // } catch {
    //     payment_gateways = [];
    // }

    // const payment_gateway = payment_gateways.find((payment_gateway) => {
    //     return (String(payment_gateway.id) == String(args.input.payment_gateway_id));
    // });

    // // check access exists
    // if (!payment_gateway)
    //     error_res(trans('not_found', { attr: 'payment_gateway' }));

    // // find shipping_method
    // let shipping_method;
    // try {
    //     shipping_method = await ShippingMethodModel.findById(args.input.shipping_method_id).lean({ virtuals: true, defaults: true });
    // } catch (e) {
    //     shipping_method = null;
    // }
    // // check shipping_method exists
    // if (!shipping_method)
    //     error_res(trans('not_found', { attr: 'shipping_method' }));


    // get input
    const input = collect(args.input).only(['address_id', 'shipping_method_id', 'payment_gateway_id', 'note', 'is_inquiry']).all();

    // validate input :
    const rules = {
        address_id: !input?.is_inquiry ? 'required' : '',
        // shipping_method_id: 'required',
        // payment_gateway_id: 'required',
        note: 'string',
        is_inquiry: 'required',
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.date = Date.now();
    input.number = `O${Date.now()}`;
    input.type = OrderModel.types.complete;
    input.status = OrderModel.statuses.not_set;

    for (let i in order.products) {
        try {
            const product = await ProductModel.findOne({ _id: order.products[i].product_id });
            const mix_variant = (product?.mix_variant || []).find(m => {
                return String(m.keys) == String(order.products[i].mix_variant_keys);
            });
            order.products[i].price_id = mix_variant?.price_id || product.mix_variant[0].price_id;
        } catch (e) { console.log(e);/* empty */ }
    }

    await order.set(input).save();

    const prices = await order.calculate_sum();
    order.total_prices = prices;

    try {
        let email_html = `
        <div dir="rtl">
            <h3>سفارش جدید <string>"${AuthUser.name} ${AuthUser.last_name}"</strong>:</h3>
            <a href="https://admin.asantakmil.com/inquiries">مشاهده</a>
        </div>`;
        const email = await get_setting('web_settings_new_orders_to_email');
        await send_email_html(email.value, `سفارش جدید (${AuthUser.name} ${AuthUser.last_name})`, email_html);
    } catch { /* empty */ }

    // todo: for debug accept order
    // await create_transaction(payment_gateway.gateway, '', prices.pay_price, order.id, '', AuthUser._id, payment_gateway.fields);
    await create_transaction(1, '', prices.pay_price, order.id, '', AuthUser._id,
        { sandBox: true, terminalId: '', userName: '', userPassword: '' });

    // todo: for debug accept order
    order.status = OrderModel.statuses.not_set;
    await order.save();

    return {
        order,
        payment_url: `${process.env.WEB_URL}verify-payment?order_id=${order._id}`,
    };
};
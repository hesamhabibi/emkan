const { get_setting } = require('@helpers/SettingHelper');

module.exports = async (parent, args, { error_res, trans }) => {
    // find payment_gateways
    let payment_gateways;
    try {
        payment_gateways = (await get_setting('payment_gateways')).value || [];
    } catch {
        payment_gateways = [];
    }

    const payment_gateway = payment_gateways.find((payment_gateway) => {
        return (String(payment_gateway.id) == String(args.id));
    });

    // check access exists
    if (!payment_gateway)
        error_res(trans('not_found', { attr: "payment_gateway" }));

    return payment_gateway;
};
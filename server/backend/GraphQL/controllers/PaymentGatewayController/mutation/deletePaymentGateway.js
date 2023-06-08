const { SettingModel } = require('@models');
const { get_setting } = require('@helpers/SettingHelper');

module.exports = async (parent, args, { trans }) => {

    // find payment_gateways
    let setting;
    let all_payment_gateways;
    try {
        setting = await get_setting('payment_gateways');
        all_payment_gateways = setting.value;
    } catch {
        setting = null;
        all_payment_gateways = [];
    }

    // delete payment_gateway
    all_payment_gateways = (all_payment_gateways || []).filter((payment_gateway) => {
        return !(String(payment_gateway.id) == String(args.id));
    });

    // await setting.save();
    await SettingModel.updateOne({ _id: setting._id }, { value: all_payment_gateways });

    return { success: true, message: trans('done') };
};
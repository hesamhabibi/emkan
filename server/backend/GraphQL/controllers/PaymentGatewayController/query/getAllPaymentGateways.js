const { get_setting } = require('@helpers/SettingHelper');

module.exports = async () => {
    try {
        const payment_gateways = await get_setting('payment_gateways');
        return payment_gateways.value;
    } catch {
        return [];
    }
};
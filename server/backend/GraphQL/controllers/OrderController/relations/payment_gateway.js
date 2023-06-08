const { get_setting } = require('@helpers/SettingHelper');

module.exports = async (parent) => {
    try {
        // find payment_gateways
        let payment_gateways;
        try {
            payment_gateways = (await get_setting('payment_gateways')).value || [];
        } catch {
            payment_gateways = [];
        }
        
        const payment_gateway = payment_gateways.find((payment_gateway) => {
            return (String(payment_gateway.id) == String(parent.payment_gateway_id));
        });
        return payment_gateway;
    } catch (e) {
        return null;
    }
};
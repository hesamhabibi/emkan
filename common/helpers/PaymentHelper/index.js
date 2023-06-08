const { TransactionModel } = require('@models');
const { create_transaction: melat_create_transaction, verify_callback: melat_verify_callback } = require('./Melat');

const create_transaction = (gateway, callback_url, amount, order_id, description, user_id, terminal_options = null) => {

	switch (gateway) {
		case TransactionModel.gateways.melat: {
			const options = terminal_options || { terminalId: process.env.GATEWAY_MELAT_TERMINAL_ID, userName: process.env.GATEWAY_MELAT_USER_NAME, userPassword: process.env.GATEWAY_MELAT_USER_PASSWORD, sandBox: process.env.GATEWAY_MELAT_SANDBOX };
			const result = melat_create_transaction(options, { orderId: order_id, amount: amount, callBackUrl: callback_url, user_id: user_id, description: description, /* payerId: 0 */ })
			return {
				success: result.success,
				message: result.message,
				payment_url: result.payment_url,
				transaction: result.transaction,
			}
		}
		default:
			return {
				success: false,
				message: "please select valid gateway",
				payment_url: null,
				transaction: null,
			}

	}
}

const verify_callback = (body) => {
	// find transaction by body
	return 0;
}

const verify_transaction = (transaction_id) => {
	return 0;
}

module.exports = {
	create_transaction,
	verify_callback,
	verify_transaction,
}
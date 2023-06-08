const soap = require('soap');
const moment = require('moment');
const { createTransaction } = require('@helpers/TransactionHelper');
const { TransactionModel } = require('@models');

module.exports = async ({ terminalId, userName, userPassword, sandBox = true }, { orderId, amount, callBackUrl, user_id, description = null, payerId = 0 }) => {

    // create transaction
    // if creation was not successful return error
    // create client
    // if creation was not successful return error
    // send request
    // if request was success update transaction and return data
    // if request wasn't successful, translate its code and return error
    // if any error occurred return error

    let create_transaction_result = null;
    // create transaction
    try {
        create_transaction_result = await createTransaction({
            sand_box: sandBox,
            status: TransactionModel.statuses.not_verified,
            request_parsed_response: { code: -1, message: '' },
            request_response: null,
            callback_parsed_response: { code: -1, message: '' },
            callback_response: null,
            verify_parsed_response: { code: -1, message: '' },
            verify_response: null,
            gateway: TransactionModel.gateways.melat,
            amount: amount,
            description: description,

            paidAt: null,
            verifiedAt: null,
            payment_url: null, // will fill below

            order_id: orderId,
            user_id: user_id,
        });

    } catch (e) {
        console.log('here', e);
        create_transaction_result = null;
    }

    // transaction
    if (!create_transaction_result || !create_transaction_result.success) {
        // todo: change errors to message;
        return { success: false, errors: create_transaction_result?.errors, payment_url: null, transaction: null };
    }

    const transaction = create_transaction_result.transaction;

    try {
        // request transaction
        let client;
        if (sandBox)
            client = await soap.createClientAsync('https://banktest.ir/gateway/mellat/ws?wsdl');
        else
            client = await soap.createClientAsync('https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl');
        var params = {
            terminalId: terminalId,
            userName: userName,
            userPassword: userPassword,
            orderId: transaction.unique_number,
            amount: amount,
            localDate: moment().format('YYMMDD'),
            localTime: moment().format('HHmmSS'),
            additionalData: JSON.stringify({
                transaction_id: transaction._id,
            }),
            callBackUrl: callBackUrl,
            payerId: payerId || 0,
        };
        const result = await client.bpPayRequestAsync(params);

        let return_data = typeof (result[0].return) === 'string' ? result[0].return : '';
        return_data = return_data.split(',');
        if (return_data[0] == '0') {
            const RefId = return_data[1];
            let url;
            if (sandBox)
                url = `https://banktest.ir/gateway/pgw.bpm.bankmellat.ir/pgwchannel/startpay.mellat?RefId=${RefId}`;
            else
                url = `https://bpm.shaparak.ir/pgwchannel/startpay.mellat?RefId=${RefId}`;
            await transaction.set({ payment_url: url, status: TransactionModel.statuses.not_verified, request_parsed_response: { code: 0, message: '' /* todo: translate error */ }, request_response: result }).save();
            return { success: true, errors: null, payment_url: url, transaction };
        } else {
            // reject transaction
            await transaction.set({ payment_url: null, status: TransactionModel.statuses.reject, request_parsed_response: { code: parseInt(return_data[0]) || -1, message: '' /* todo: translate error */ }, request_response: result }).save();
            return { success: false, errors: transaction.request_parsed_response, payment_url: null, transaction };
        }
    } catch (e) {
        await transaction.set({ payment_url: url, status: TransactionModel.statuses.reject, request_parsed_response: { code: -1, message: 'unexpected error' }, request_response: { error: e } }).save();
        return { success: false, errors: { default_error: e /* todo: errors here */ }, payment_url: null, transaction };
    }
}
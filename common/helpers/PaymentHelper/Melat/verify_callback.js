const soap = require('soap');
const code_messages = require('./code_messages');
const { TransactionModel } = require('@models');

module.exports = async ({ terminalId, userName, userPassword, sandBox = true }, body) => {
    // body is not valid
    if (!body || typeof body !== 'object' || Object.keys(body).length <= 0) {
        return { success: false, message: 'body is not valid', transaction: null };
    }

    const SaleOrderId = body.SaleOrderId || body.saleOrderId;
    const SaleReferenceId = body.SaleReferenceId || body.saleReferenceId;

    // body is not valid
    if (!SaleOrderId || !SaleReferenceId)
        return { success: false, message: 'body is not valid', transaction: null };

    // find transaction
    const transaction = await TransactionModel.findOne({ gateway: TransactionModel.gateways.melat, status: { "$ne": TransactionModel.statuses.complete }, unique_number: SaleOrderId });
    if (!transaction) {
        return { success: false, message: 'transaction not found', transaction: null };
    }

    // update extra fields
    await transaction.set({ extra_fields: { saleOrderId: SaleOrderId, saleReferenceId: SaleReferenceId } }).save();

    try {
        let client;
        if (sandBox)
            client = await soap.createClientAsync('https://banktest.ir/gateway/mellat/ws?wsdl');
        else
            client = await soap.createClientAsync('https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl');

        const params = {
            terminalId,
            userName,
            userPassword,
            orderId: SaleOrderId,
            saleOrderId: SaleOrderId,
            saleReferenceId: SaleReferenceId,
        };

        const result = await client.bpVerifyRequestAsync(params);

        if (result[0].return == '0') { // verify done
            if (await settle({ terminalId, userName, userPassword, sandBox }, { saleOrderId: SaleOrderId, saleReferenceId: SaleReferenceId })) {
                // transaction done
                await transaction.set({ callback_response: result, callback_parsed_response: { code: TransactionModel.response_codes.done, message: "done" }, status: TransactionModel.statuses.complete, verifiedAt: Date.now(), paidAt: Date.now() }).save();
                return { success: true, message: 'verified successfully', transaction };
            } else {
                // reverse and reject
                await transaction.set({ callback_response: result, callback_parsed_response: { code: TransactionModel.response_codes.error, message: "settle was not successful" }, status: TransactionModel.statuses.reject, verifiedAt: Date.now(), paidAt: null }).save();
                await reverse({ terminalId, userName, userPassword, sandBox }, {})
                return { success: false, message: 'settle was not successful', transaction };
            }
        } else {
            // reverse
            await transaction.set({ callback_response: result, callback_parsed_response: { code: TransactionModel.response_codes.error, message: code_messages[result[0].return] }, status: TransactionModel.statuses.reject, verifiedAt: Date.now(), paidAt: null }).save();
            await reverse({ terminalId, userName, userPassword, sandBox }, {});
            return { success: false, message: 'verification was not successful', transaction };
        }

        await transaction.set({ callback_response: e, callback_parsed_response: { code: TransactionModel.response_codes.error, message: 'unexpected error' }, status: TransactionModel.statuses.reject, verifiedAt: Date.now(), paidAt: null }).save();
        return { success: false, message: 'unexpected error', transaction };

    } catch (e) {
        await reverse({ terminalId, userName, userPassword, sandBox }, {});
        await transaction.set({ callback_response: e, callback_parsed_response: { code: TransactionModel.response_codes.error, message: 'unexpected error' }, status: TransactionModel.statuses.reject, verifiedAt: Date.now(), paidAt: null }).save();
        return { success: false, message: 'unexpected error', transaction };
    }
}


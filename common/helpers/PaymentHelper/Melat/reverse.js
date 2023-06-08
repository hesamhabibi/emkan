module.exports = async ({ terminalId, userName, userPassword, sandBox = true }, body) => {
    try {
        // body is not valid
        if (!body || typeof body !== 'object' || Object.keys(body).length <= 0) {
            return false;
        }

        const SaleOrderId = body.SaleOrderId || body.saleOrderId;
        const SaleReferenceId = body.SaleReferenceId || body.saleReferenceId;

        // body is not valid
        if (!SaleOrderId || !SaleReferenceId)
            return false;

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
        const result = await client.bpReversalRequestAsync(params);

        if (result[0].return == '0')
            return true;
    } catch {
        return false;
    }

    return false;
}
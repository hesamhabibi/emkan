module.exports = async (parent, args, { models: { TransactionModel }, error_res, trans }) => {
    // find transaction
    let transaction;
    try {
        transaction = await TransactionModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        transaction = null;
    }
    // check transaction exists
    if (!transaction)
        error_res(trans('not_found', { attr: "transaction" }));
    return transaction;
};
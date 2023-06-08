module.exports = async (parent, args, { models: { TransactionModel } }) => {
    try {
        return await TransactionModel.findOne({ _id: parent.transaction_id });
    } catch (e) {
        return null;
    }
};
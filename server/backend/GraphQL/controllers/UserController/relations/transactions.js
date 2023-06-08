module.exports = async (parent, args, { models: { TransactionModel } }) => {
    try {
        return await TransactionModel.find({ user_id: parent._id });
    } catch (e) {
        return [];
    }
};
const { TransactionModel } = require('@models');

module.exports = async () => {
    const [max_number] = await TransactionModel.aggregate([{
        $group: {
            _id: "max",
            max: { $max: "$unique_number" }
        }
    }]);
    return (max_number.max || 0) + 1;
}
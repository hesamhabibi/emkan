const { TransactionModel } = require('@models');
const validate_input = require('./validate_input');
const error_codes = require('./error_codes');
const generateUniqueNumber = require('./generateUniqueNumber');

module.exports = async (data) => {

    const { validation_result, input } = await validate_input(data);
    if (!validation_result.pass) {
        return {
            success: false,
            transaction: null,
            errors: validation_result.errors,
            code: error_codes.validation_error,
        };
    }

    try {
        input.unique_number = await generateUniqueNumber();
        const transaction = await TransactionModel.create(input);
        return {
            success: true,
            transaction,
            errors: null,
            code: 0
        };
    } catch (e) {
        return {
            success: false,
            transaction: null,
            errors: { message: e.message },
            code: error_codes.unexpected_error,
        };
    }
};
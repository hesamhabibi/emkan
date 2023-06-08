const { PriceModel } = require('../../models');
const validate_input = require('./validate_input');
const error_codes = require('./error_codes');

module.exports = async (data) => {

    const { validation_result, input } = await validate_input(data);
    if (!validation_result.pass) {
        return {
            success: false,
            price: null,
            errors: validation_result.errors,
            code: error_codes.validation_error,
        };
    }

    try {
        const price = await PriceModel.create(input);
        return {
            success: true,
            price,
            errors: null,
            code: 0
        };
    } catch {
        return {
            success: false,
            price: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
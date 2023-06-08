const { AddressModel } = require('../../models');
const validate_input = require('./validate_input');
const error_codes = require('./error_codes');

module.exports = async (data) => {

    const { validation_result, input } = await validate_input(data);
    if (!validation_result.pass) {
        return {
            success: false,
            address: null,
            errors: validation_result.errors,
            code: error_codes.validation_error,
        };
    }

    try {
        const address = await AddressModel.create(input);
        return {
            success: true,
            address,
            errors: null,
            code: 0
        };
    } catch (e) {
        return {
            success: false,
            address: null,
            errors: { message: e.message },
            code: error_codes.unexpected_error,
        };
    }
};
const { trans } = require('../TranslateHelper');
const { AddressModel } = require('../../models');
const validate_input = require('./validate_input');
const error_codes = require('./error_codes');

module.exports = async (address_id, data) => {
    let address;
    if (typeof address === 'string' || !Object.keys(address_id).includes('_doc')) {
        // find address
        try {
            address = await AddressModel.findById(address_id);
        } catch (e) {
            address = null;
        }
    } else {
        address = address_id;
    }

    if (!address)
        return {
            success: false,
            address: null,
            errors: { address: { default: trans('not_found', { attr: 'address' }) } },
            code: error_codes.not_found,
        };

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
        await address.set(input).save();
        return {
            success: true,
            address: address,
            errors: null,
            code: 0,
        };
    } catch {
        return {
            success: false,
            address: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
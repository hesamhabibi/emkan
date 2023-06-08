const { trans } = require('../TranslateHelper');
const { AddressModel } = require('../../models');
const error_codes = require('./error_codes');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (address_id) => {
    // find address
    let address;
    if (typeof address_id === 'string' || ObjectId.isValid(address_id)) {
        // find address
        try {
            address = await AddressModel.findById(address_id);
        } catch (e) {
            address = null;
        }
    } else {
        address = address_id;
    }
    // check address exists
    if (!address)
        return {
            success: false,
            address: null,
            errors: { address: { default: trans('not_found', { attr: 'address' }) } },
            code: error_codes.not_found,
        };

    // delete address
    try {
        await address.delete();
        return {
            success: true,
            address: null,
            errors: null,
            code: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            address: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
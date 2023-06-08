const { AddressModel } = require('../../models');
const createAddress = require('./createAddress');
const error_codes = require('./error_codes');

module.exports = async (instance, data) => {
    let address;
    try {
        const create_result = await createAddress(data);
        if (create_result.success) {
            address = create_result.address;
        } else { // if create address is not success then return null
            return {
                success: false,
                address: null,
                instance: null,
                errors: create_result.errors,
                code: error_codes.validation_error,
            };
        }
    } catch (e) { // if any error occurred return null
        return {
            success: false,
            address: null,
            instance: null,
            errors: { message: e.message },
            code: error_codes.unexpected_error,
        };
    }

    // update relations:
    try {
        await address.set({
            model_name: instance.constructor.modelName,
            model_id: instance._id,
        }).save();
        return {
            success: true,
            address: address,
            instance,
            errors: null,
            code: 0,
        };

    } catch (e) { // if any error occurred return null
        return {
            success: false,
            address: null,
            instance: null,
            errors: { message: e.message },
            code: error_codes.unexpected_error,
        };
    }
};
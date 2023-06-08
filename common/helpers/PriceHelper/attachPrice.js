const createPrice = require('./createPrice');
const error_codes = require('./error_codes');

module.exports = async (instance, data) => {
    let price;
    try {
        const create_result = await createPrice(data);
        if (create_result.success) {
            price = create_result.price;
        } else { // if create price is not success then return null
            return {
                success: false,
                price: null,
                instance: null,
                errors: create_result.errors,
                code: error_codes.validation_error,
            };
        }
    } catch { // if any error occurred return null
        return {
            success: false,
            price: null,
            instance: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }

    // update relations:
    try {
        let model_name = instance.constructor.modelName;
        if (!model_name)
        model_name = instance.modeName;
        let model_id = instance._id;
        if (!model_id)
        model_id = instance.id;

        price.set({
            model_name,
            model_id,
        });
        await price.save();
        instance.set({
            price_id: price._id,
        });
        await instance.save();
        return {
            success: true,
            price,
            instance,
            errors: null,
            code: error_codes.unexpected_error,
        };

    } catch { // if any error occurred return null
        return {
            success: false,
            price: null,
            instance: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
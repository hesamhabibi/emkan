const { PriceModel } = require('../../models');
const error_codes = require('./error_codes');
const { trans } = require('../TranslateHelper');

// instance can be product instance of object of {model_id:'',modelName:''}
module.exports = async (instance, model_variant_keys = null, type = PriceModel.types.normal) => {
    let price;
    try { // try find price attached to this instance
        let target_id = instance._id;
        if (!target_id)
            target_id = instance.model_id;
        let target_model_name = instance.constructor.modelName;
        if (!target_model_name)
            target_model_name = instance.modelName;

        // price = await PriceModel.findOne({ _id: instance.price_id });
        if (model_variant_keys)
            price = await PriceModel.findOne({ model_name: target_model_name, model_id: target_id, model_variant_keys: model_variant_keys, type: type }).sort({ createdAt: -1 });
        else
            price = await PriceModel.findOne({ model_name: target_model_name, model_id: target_id, type: type }).sort({ createdAt: -1 });
    } catch {
        price = null;
    }

    if (price)
        return {
            success: true,
            price,
            errors: null,
            code: 0,
        };

    return {
        success: false,
        price: null,
        errors: { price: { default: trans('not_found', { attr: 'price' }) } },
        code: error_codes.not_found,
    };
};
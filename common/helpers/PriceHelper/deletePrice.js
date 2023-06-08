const { trans } = require('../TranslateHelper');
const { PriceModel } = require('../../models');
const error_codes = require('./error_codes');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (price_id) => {
    // find price
    let price;
    if (typeof price_id === 'string' || ObjectId.isValid(price_id)) {
        // find price
        try {
            price = await PriceModel.findById(price_id);
        } catch (e) {
            price = null;
        }
    } else {
        price = price_id;
    }
    // check price exists
    if (!price)
        return {
            success: false,
            price: null,
            errors: { price: { default: trans('not_found', { attr: 'price' }) } },
            code: error_codes.not_found,
        };

    // delete price
    try {
        await price.delete();
        return {
            success: true,
            price: null,
            errors: null,
            code: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            price: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
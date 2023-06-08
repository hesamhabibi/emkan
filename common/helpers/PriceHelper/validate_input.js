const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { PriceModel } = require('@models');
const ValidationHelper = require('../ValidationHelper');
const rules = require('./validation_rules');

module.exports = async (data) => {

    const input = collect(data).only(['price', 'offer_price', 'offer_startAt', 'offer_expireAt', 'discount_percent','type']).all();

    if (!input.discount_percent && input.price > 0 && input.offer_price) { // auto generate discount_percent
        input.discount_percent = Math.floor((1 - (input.offer_price / input.price)) * 100);
    }

    if (!input.type){
        input.type = PriceModel.types.normal;
    }

    const validation = new Validatorjs({ price: input }, { price: rules });
    return { validation_result: await ValidationHelper.checkAsync(validation), input };
};
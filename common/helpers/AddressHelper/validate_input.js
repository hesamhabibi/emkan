const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const ValidationHelper = require('../ValidationHelper');
const rules = require('./validation_rules');

module.exports = async (data) => {

    const input = collect(data).only(['title','postal_code', 'city_id', 'state_id', 'address', 'location', 'is_default']).all();

    const validation = new Validatorjs({ address_input: input }, { address_input: rules });
    return { validation_result: await ValidationHelper.checkAsync(validation), input };
};
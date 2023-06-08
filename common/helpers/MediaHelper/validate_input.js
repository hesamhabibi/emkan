const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const ValidationHelper = require('../ValidationHelper');

module.exports = async (data) => {

    const input = collect(data).only(['sort', 'main', 'alt']).all();
    // validate input :
    const rules = {
        'sort': 'integer',
        'main': 'boolean',
        'alt': 'min:1',
    };

    const validation = new Validatorjs({ media_input: input }, { media_input: rules });
    return { validation_result: await ValidationHelper.checkAsync(validation), input };
};
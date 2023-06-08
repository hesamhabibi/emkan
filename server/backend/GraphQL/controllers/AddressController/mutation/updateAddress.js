const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');


module.exports = async (parent, args, { models: { AddressModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find address
    let address;
    try {
        address = await AddressModel.findById(args.id);
    } catch (e) {
        address = null;
    }
    // check address exists
    if (!address)
        error_res(trans('not_found', { attr: "address" }));

    // get input
    const input = collect(args.input).only(['title', 'postal_code', 'city_id', 'state_id', 'address', 'location', 'is_default']).all();

    // validate input :
    const rules = {
        title: ['required', 'string'],
        postal_code: ['required', 'digits:10'],
        city_id: ['required', 'integer'],
        state_id: ['required', 'integer'],
        address: 'string',
        // location: 'json',
        is_default: 'boolean',
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    await address.set(input).save();
    return address;
};
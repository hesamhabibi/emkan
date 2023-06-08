const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AddressModel, UserModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['title','postal_code', 'city_id', 'state_id', 'address', 'location', 'is_default', 'user_id']).all();

    // validate input :
    const rules = {
        title: ['required','string'],
        postal_code: ['required','digits:10'],
        city_id: ['required','integer'],
        state_id: ['required','integer'],
        address: 'string',
        // location: 'json',
        is_default: 'boolean',
        user_id: 'exists:UserModel,_id',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.model_name = UserModel.modelName;
    input.model_id = input.user_id;

    // find user
    let user_address_ids;
    try {
        user_address_ids = (await UserModel.findById(input.user_id)).user_information.address_ids || [];
    } catch (e) {
        console.log(e);
        user_address_ids = [];
    }

    // create address
    const address = await AddressModel.create(input);

    await UserModel.findOneAndUpdate(
        { _id: input.user_id },
        { user_information: { address_ids: [...user_address_ids, address._id] } }
    );

    return address;
};
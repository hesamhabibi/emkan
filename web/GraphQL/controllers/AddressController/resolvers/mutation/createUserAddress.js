const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AddressModel, UserModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['postal_code', 'city_id', 'state_id', 'address', 'location', 'mobile']).all();

    input.user_id = AuthUser._id;
    // validate input :
    const rules = {
        postal_code: ['required', 'digits:10'],
        city_id: ['required', 'integer'],
        state_id: ['required', 'integer'],
        address: ['required', 'string'],
        mobile: ['required', 'string', 'mobile'],
        // location: 'json',
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
        user_address_ids = await UserModel.findById(input.user_id).user_information.address_ids || [];
    } catch (e) {
        user_address_ids = [];
    }

    // create address
    const address = await AddressModel.create(input);


    await UserModel.findOneAndUpdate(
        { _id: input.user_id },
        { user_information: { address_ids: [...user_address_ids, address._id] } }, { new: true }
    );

    //set user default addresses to false 
    await AddressModel.find(
        { model_id: input.user_id }
    ).updateMany({ $set: { is_default: false } });


    await AddressModel.findOneAndUpdate(
        { _id: address._id },
        { is_default: true }
    );

    return address;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { ValidationHelper, SMSHelper: { send_verify_code } }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['name', 'last_name', 'username', 'email', 'mobile']).all();

    // validate input :
    const rules = {
        name: 'min:3',
        username: ['min:3', { 'unique': { model: UserModel } }],
        email: ['email', { 'unique': { model: UserModel } }],
        mobile: ['required', 'digits:11', { 'unique': { model: UserModel } }],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.is_active = true;
    input.access_id = null; // todo: get from settings

    // create user
    const user = await UserModel.create(input);

    const token = await UserModel.generateLoginVerifyToken(user);
    const result = send_verify_code(user.mobile, token);


    if (result) {
        return {
            success: true,
            message: trans('sent', { attr: 'sms' })
        };
    }
    error_res();
    return null;
};
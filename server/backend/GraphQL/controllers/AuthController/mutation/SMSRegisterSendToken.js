const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { ValidationHelper, SMSHelper: { send_verify_code } }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['recaptcha_v3_token', 'name', 'last_name', 'username', 'email', 'mobile']).all();

    // validate input :
    const rules = {
        recaptcha_v3_token: 'recaptcha',
        name: 'min:3',
        username: ['required', 'min:3', { 'unique': { model: UserModel } }],
        email: ['required', 'email', { 'unique': { model: UserModel } }],
        mobile: ['required', 'digits:11', { 'unique': { model: UserModel } }],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.is_active = true;
    input.access_id = null;

    // create user
    const user = await UserModel.create(input);

    const token = await UserModel.generateLoginVerifyToken(user);
    const result = send_verify_code(user.mobile, token);
    console.log('login token:', token);

    if (result) {
        return {
            success: true,
            message: trans('sent', { attr: 'sms' })
        };
    }
    error_res();
    return null;
};
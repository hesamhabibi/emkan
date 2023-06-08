const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { SMSHelper: { send_verify_code }, ValidationHelper }, error_res, trans }) => {
    const validation = new Validatorjs({ recaptcha_v3_token: args.recaptcha_v3_token }, { recaptcha_v3_token: 'recaptcha', });
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const user = await UserModel.findOne({ mobile: args.mobile, is_active: true });
    if (!user)
        error_res(trans('not_found', { attr: "user" }));

    const token = await UserModel.generateLoginVerifyToken(user);

    const result = send_verify_code(user.mobile, token, 'http://www.google.com');

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
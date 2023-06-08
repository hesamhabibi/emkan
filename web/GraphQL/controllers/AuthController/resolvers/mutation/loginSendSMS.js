const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { SMSHelper: { send_verify_code }, ValidationHelper }, error_res, trans }) => {

    const validation = new Validatorjs({ mobile: args.mobile }, { mobile: ['required', 'digits:11'] });

    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const user = await UserModel.findOne({ mobile: args.mobile, is_active: true });
    if (!user)
        error_res(trans('not_found', { attr: 'user' }));

    const token = await UserModel.generateLoginVerifyToken(user);


    console.log('login token:', token);

    // todo: for debug
    return {
        success: true,
        message: `code is : "${token}"`
    };

    // todo: uncomment these codes
    // const result = await send_verify_code(user.mobile, token);

    // if (result) {
    //     return {
    //         success: true,
    //         message: trans('sent', { attr: 'sms' })
    //     };
    // }
    // error_res();
};
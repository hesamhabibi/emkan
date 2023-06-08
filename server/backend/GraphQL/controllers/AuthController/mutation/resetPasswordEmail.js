const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { helpers: { ValidationHelper, EmailHelper: { send_email_html } }, models: { UserModel }, error_res, trans }) => {
    const validation = new Validatorjs({ recaptcha_v3_token: args.recaptcha_v3_token }, { recaptcha_v3_token: 'recaptcha', });
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // find user
    let user;
    try {
        user = await UserModel.findOne({ email: args.email });
    } catch {
        user = null;
    }

    // check user exist
    if (!user)
        error_res(trans("not_found", { attr: "email" }));

    const token = await UserModel.generateResetPasswordToken(user);

    const result = await send_email_html(args.email, 'verify token', `<div style="text-align: center;"><div><h3>your verify token is</h3></div><span>${token}</span></div>`);
    // for debug
    console.log(`password reset token for user with email: "${args.email}" is : "${token}"`);

    if (result.success) {
        return {
            success: true,
            message: trans("sent", { attr: "email" })
        };
    }
    error_res();
    return null;

};
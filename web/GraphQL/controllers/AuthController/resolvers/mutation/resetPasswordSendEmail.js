module.exports = async (parent, args, { helpers: { EmailHelper: { send_email_html } }, models: { UserModel }, error_res, trans }) => {
    // find user
    let user;
    try {
        user = await UserModel.findOne({ email: args.email });
    } catch {
        user = null;
    }

    // check user exist
    if (!user)
        error_res(trans('not_found', { attr: 'email' }));

    const token = await UserModel.generateResetPasswordToken(user);

    const result = await send_email_html(args.email, 'verify token', `<div style="text-align: center;"><div><h3>your verify token is</h3></div><span>${token}</span></div>`);
    // todo: for debug
    const message = `password reset token for user with email: "${args.email}" is : "${token}"`;
    console.log(message);

    if (result.success) {
        return {
            success: true,
            message: trans('sent', { attr: 'email' }),
            // message: message,
        };
    }
    error_res();
    return null;

};
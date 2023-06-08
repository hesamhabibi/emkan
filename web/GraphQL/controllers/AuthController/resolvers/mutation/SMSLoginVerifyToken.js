module.exports = async (parent, args, { models: { UserModel }, helpers: { DeviceHelper, CookieHelper }, error_res, trans, req, res }) => {

    const user = await UserModel.findOne({ mobile: args.mobile });
    if (!user)
        error_res(trans('not_found', { attr: 'user' }));

    if (!user.is_active) // check user is active
        error_res(trans('not_active', { attr: 'user' }));

    if (await UserModel.checkLoginVerifyToken(user, args.token)) {
        const device_type = await DeviceHelper.device_type(req);
        let field = UserModel.token_fields[`${device_type}_web`];
        if (!field)
            field = UserModel.token.token_fields.default;
        const token = await UserModel.generateToken(user, field, false);
        await CookieHelper.set_token(req, res, token);
        await UserModel.clearLoginVerifyToken(user);

        await UserModel.updateOne({ _id: user._id },
            {
                tokens: {
                    desktop_token: token
                }
            });

        return {
            token,
            user,
        };
    }
    error_res(trans('incorrect', { attr: 'token' }));
    return null;
};
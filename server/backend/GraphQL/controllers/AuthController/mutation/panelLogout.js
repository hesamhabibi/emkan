module.exports = async (parent, args, { models: { UserModel }, helpers: { DeviceHelper, CookieHelper }, error_res, trans, AuthUser, req, res }) => {
    if (!AuthUser)
        error_res(trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE);
    const device_type = await DeviceHelper.device_type(req);
    await UserModel.clearToken(AuthUser, UserModel.token_fields[device_type]);
    await CookieHelper.set_token(req, res, null);
    return {
        success: true,
        message: trans('done'),
    };
};
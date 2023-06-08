const Validatorjs = require('validatorjs');
const { getMenuItemsByAccess } = require('@helpers/MenuItemHelper');

module.exports = async (parent, args, { models: { UserModel }, helpers: { DeviceHelper, ValidationHelper, CookieHelper }, error_res, trans, req, res }) => {
    const validation = new Validatorjs({ recaptcha_v3_token: args.recaptcha_v3_token }, { recaptcha_v3_token: 'recaptcha', });
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const user = await UserModel.findOne({ mobile: args.mobile });
    if (!user)
        error_res(trans('not_found', { attr: "user" }));

    if (!user.is_active) // check user token generated
        error_res(trans('not_active', { attr: "user" }));

    if (await UserModel.checkLoginVerifyToken(user, args.token)) {
        const device_type = await DeviceHelper.device_type(req);
        const field = UserModel.token_fields[device_type];
        const token = await UserModel.generateToken(user, field);
        await CookieHelper.set_token(req, res, token);
        await UserModel.clearLoginVerifyToken(user);

        let menu_items;
        try {
            menu_items = getMenuItemsByAccess(user);
        } catch {
            menu_items = [];
        }

        return {
            token,
            user,
            menu_items,
        };
    }
    error_res(trans('incorrect', { attr: "token" }));
    return null;
};
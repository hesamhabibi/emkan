const bcrypt = require('bcryptjs');
const Validatorjs = require('validatorjs');
const { getMenuItemsByAccess } = require('@helpers/MenuItemHelper');

module.exports = async (parent, args, { models: { UserModel, SettingModel }, helpers: { DeviceHelper, ValidationHelper, CookieHelper }, error_res, trans, req, res, panel_local }) => {

    const validation = new Validatorjs({ recaptcha_v3_token: args.recaptcha_v3_token }, { recaptcha_v3_token: 'recaptcha', });
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const email_regex = RegExp(/^([a-z0-9+_-]+)(.[a-z0-9+_-]+)*@([a-z0-9-]+.)+[a-z]{2,6}$/i);
    const mobile_regex = RegExp(/^[0]{1}[9]{1}[0-9]{9}$/);

    let type = 'username';
    if (email_regex.test(args.username))
        type = 'email';
    if (mobile_regex.test(args.username))
        type = 'mobile';

    const user = await UserModel.findOne({ [type]: args.username });
    if (!user)
        error_res(trans('login_error'));
    let password_match;
    try {
        password_match = bcrypt.compareSync(String(args.password), String(user.password));
    } catch (e) {
        console.log(e);
        error_res(trans('login_error'));
    }
    if (password_match) {

        if (!user.is_active) // check user token generated
            error_res(trans('not_active', { attr: "user" }));

        const device_type = await DeviceHelper.device_type(req);
        const field = UserModel.token_fields[device_type];
        const token = await UserModel.generateToken(user, field);
        await CookieHelper.set_token(req, res, token);

        let menu_items;
        try {
            menu_items = await getMenuItemsByAccess(user);
        } catch {
            menu_items = [];
        }

        let panel_logo_image_setting = await SettingModel.findByKey("panel_logo_image");
        let web_default_language_setting = await SettingModel.findByKey("web_default_language");
        let shop_name_setting = await SettingModel.findByKey("shop_name");
        const settings = {
            panel_logo_image: panel_logo_image_setting?.value,
            web_default_language: web_default_language_setting?.value,
            shop_name: shop_name_setting?.value ? (shop_name_setting?.value[panel_local] ? shop_name_setting?.value[panel_local] : shop_name_setting?.value) : '',
        };
        return {
            token,
            user,
            menu_items,
            settings,
        };
    } else
        error_res(trans('login_error'));
    return null;
};
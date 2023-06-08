const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');


module.exports = async (parent, args, { models: { UserModel }, helpers: { DeviceHelper, ValidationHelper, CookieHelper }, error_res, trans, req, res }) => {

    const input = collect(args.input).only(['username', 'password']).all();

    // validate input :
    const rules = {
        username: 'required',
        password: ['required', 'min:3']
    };
    const validation = new Validatorjs(input, rules);

    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const email_regex = RegExp(/^([a-z0-9+_-]+)(.[a-z0-9+_-]+)*@([a-z0-9-]+.)+[a-z]{2,6}$/i);
    const mobile_regex = RegExp(/^[0]{1}[9]{1}[0-9]{9}$/);

    let type = 'username';
    if (email_regex.test(input.username))
        type = 'email';
    if (mobile_regex.test(input.username))
        type = 'mobile';

    const user = await UserModel.findOne({ [type]: input.username });
    if (!user)
        error_res(trans('login_error'));
    let password_match;
    try {
        password_match = bcrypt.compareSync(String(input.password), String(user.password));
    } catch (e) {
        error_res(trans('login_error'));
    }
    if (password_match) {

        if (!user.is_active) // check user is active
            error_res(trans('not_active', { attr: 'user' }));

        const device_type = await DeviceHelper.device_type(req);
        let field = UserModel.token_fields[`${device_type}_web`];
        if (!field)
            field = UserModel.token.token_fields.default;
        const token = await UserModel.generateToken(user, field);
        await CookieHelper.set_token(req, res, token);

        return {
            token,
            user,
        };
    } else
        error_res(trans('login_error'));
    return null;
};
const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { ValidationHelper, DeviceHelper, CookieHelper }, error_res, trans, req, res }) => {
    // get input
    const input = collect(args.input).only(['name', 'last_name', 'username', 'email', 'mobile', 'password', 'password_confirmation']).all();

    // validate input :
    const rules = {
        name: 'min:3',
        username: ['required', 'min:3', { 'unique': { model: UserModel } }],
        email: ['required', 'email', { 'unique': { model: UserModel } }],
        mobile: ['required', 'digits:11', { 'unique': { model: UserModel } }],
        password: ['required', 'min:3', 'confirmed'],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // hash password
    input.password = bcrypt.hashSync(
        input.password,
        bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUNDS, 10))
    );

    input.is_active = true;
    input.access_id = null; // todo: get from settings

    // create user
    const user = await UserModel.create(input);

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
};
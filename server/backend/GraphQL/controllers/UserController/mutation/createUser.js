const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel, AccessModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['name', 'last_name', 'access_id', 'username', 'email', 'mobile', 'password', 'is_active']).all();

    // validate input :
    const rules = {
        name: ['min:3'],
        last_name: ['min:3'],
        username: ['required', 'min:3', { 'unique': { model: UserModel } }],
        email: ['required', 'email', { 'unique': { model: UserModel } }],
        password: ['required', 'min:3'],
        mobile: ['required', 'digits:11', { 'unique': { model: UserModel } }],
        is_active: ['required', 'boolean'],
        access_id: [{ 'exists': { model: AccessModel, field: '_id' } }],
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

    // create user
    const user = await UserModel.create(input);
    return user;
};
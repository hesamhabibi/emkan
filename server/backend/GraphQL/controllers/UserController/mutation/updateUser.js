const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel, AccessModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find user
    let user;
    try {
        user = await UserModel.findById(args.id);
    } catch (e) {
        user = null;
    }
    // check user exists
    if (!user)
        error_res(trans('not_found', { attr: "user" }));

    // get input
    const input = collect(args.input).only(['name', 'last_name', 'access_id', 'username', 'email', 'mobile', 'password', 'is_active']).all();

    // validate input :
    const rules = {
        name: 'min:3',
        last_name: 'min:3',
        username: ['required', 'min:3', { 'unique': { model: UserModel, query: { _id: { "$ne": user.id } } } }],
        email: ['required', 'email', { 'unique': { model: UserModel, query: { _id: { "$ne": user.id } } } }],
        mobile: ['required', 'digits:11', { 'unique': { model: UserModel, query: { _id: { "$ne": user.id } } } }],
        password: 'min:3',
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
    if (input.password)
        input.password = bcrypt.hashSync(
            input.password,
            bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUNDS, 10))
        );

    // update user
    await user.set(input).save();
    return user;
};
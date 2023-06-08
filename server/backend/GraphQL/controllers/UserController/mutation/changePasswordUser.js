const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { ValidationHelper }, error_res, trans }) => {
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
    const input = collect(args.input).only(['password', 'password_confirmation']).all();

    // validate input :
    const rules = {
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

    // update user
    await user.set(input).save();
    return user;
};
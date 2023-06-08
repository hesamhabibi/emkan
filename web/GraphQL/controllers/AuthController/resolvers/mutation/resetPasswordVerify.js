const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { helpers: { ValidationHelper }, models: { UserModel }, error_res, trans }) => {
    // find user
    let user;
    try {
        user = await UserModel.findOne({ email: args.input.email });
    } catch (e) {
        user = null;
    }
    // check user exists
    if (!user)
        error_res(trans('not_found', { attr: 'user' }));

    // get input
    const input = collect(args.input).only(['email', 'token', 'password', 'password_confirmation']).all();

    // custom validation:
    const errors = {};
    if (!await UserModel.checkResetPasswordToken(user, args.input.token))
        errors.token = [trans('incorrect', { attr: 'token' })];

    // validate input :
    const rules = {
        email: ['required', 'email'],
        token: 'required',
        password: ['required', 'min:3', 'confirmed'],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass || Object.keys(errors).length > 0) {
        error_res(trans('validation_error'), { ...validation_result.errors, ...errors });
    }

    await UserModel.clearResetPasswordToken(user);

    // hash password
    input.password = bcrypt.hashSync(
        input.password,
        bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUNDS, 10))
    );

    // update user
    await user.set({password: input.password}).save();
    return {
        success: true,
        message: trans('done'),
    };
};
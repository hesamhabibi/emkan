const bcrypt = require('bcryptjs');
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // find user
    let user;
    try {
        user = await UserModel.findById(AuthUser._id);
    } catch (e) {
        user = null;
    }
    // check user exists
    if (!user)
        error_res(trans('not_found', { attr: 'user' }));

    // get input
    const input = collect(args.input).only(['old_password', 'password', 'password_confirmation']).all();

    // validate input :
    const rules = {
        old_password: ['string'],
        password: ['required', 'string', 'confirmed'],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    let password_match;
    try {
        if (user.password){
            password_match = bcrypt.compareSync(String(input.old_password), String(user.password));
        } else {
            password_match = true;
        }
    } catch (e) { /* empty */ }

    if (!password_match) {
        error_res(trans('validation_error'), { old_password: trans('wrong', { attr: 'old_password' }) });
    }

    // hash password
    input.password = bcrypt.hashSync(
        input.password,
        bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUNDS, 10))
    );

    // update user
    await user.set({
        password: input.password,
    }).save();
    return {
        success: true,
        message: trans('done'),
    };
};
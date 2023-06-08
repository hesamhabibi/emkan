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
    const input = collect(args.input).only(['name', 'last_name', 'username', 'email']).all();

    // validate input :
    const rules = {
        name: ['required', 'string'],
        last_name: ['required', 'string'],
        username: ['required', 'string', { 'unique': { model: UserModel, query: { _id: { '$ne': user.id } } } }],
        email: ['required', 'email', { 'unique': { model: UserModel, query: { _id: { '$ne': user.id } } } }],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update user
    await user.set(input).save();
    return {
        success: true,
        message: trans('done'),
    };
};
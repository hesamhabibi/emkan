const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { UserModel, MediaModel }, helpers: { ValidationHelper }, error_res, trans }) => {
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
    const input = collect(args.input).only(['phone', 'gender', 'media']).all();

    // validate input :
    const rules = {
        phone: 'digits:11',
        gender: [{ in: Object.values(UserModel.genders) }],
        media: {
            media_id: [{ 'exists': { model: MediaModel, field: '_id' } }],
            alt: ['string'],
            // url: '',
        },
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update user
    await user.set({ user_information: input }).save();
    return user;
};
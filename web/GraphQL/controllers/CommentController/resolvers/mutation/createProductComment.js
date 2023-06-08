const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CommentModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // get input
    const input = collect(args.input).only(['title', 'text', 'model_id']).all();
    input.user_id = AuthUser?._id;

    // validate input :
    const rules = {
        title: ['string'],
        text: ['required', 'string'],
        model_id: ['required', 'string'], // todo: check blog exists
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.confirmed = false;
    input.model_type = CommentModel.model_types.product;
    input.model_name = 'ProductModel';

    // create comment
    const comment = await CommentModel.create(input);
    return comment;
};
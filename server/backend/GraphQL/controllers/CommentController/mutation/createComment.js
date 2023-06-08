const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CommentModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // get input
    const input = collect(args.input).only(['title', 'text', 'model_type', 'model_id']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: ['string'],
        text: ['required', 'string'],
        model_type: [{ "in": Object.values(CommentModel.model_types) }],
        model_id: 'string',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.confirmed = true;

    switch (input.model_type) {
        case CommentModel.model_types.product:
            input.model_name = 'ProductModel'; break;
        case CommentModel.model_types.blog:
        case CommentModel.model_types.page:
        case CommentModel.model_types.catalogue:
        case CommentModel.model_types.project:
            input.model_name = 'BlogModel'; break;
    }

    // create comment
    const comment = await CommentModel.create(input);
    return comment;
};
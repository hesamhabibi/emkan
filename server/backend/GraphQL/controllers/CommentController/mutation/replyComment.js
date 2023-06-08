const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CommentModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // find reply_to_comment
    let reply_to_comment;
    try {
        reply_to_comment = await CommentModel.findById(args.reply_to_id);
    } catch (e) {
        reply_to_comment = null;
    }
    // check reply_to_comment exists
    if (!reply_to_comment)
        error_res(trans('not_found', { attr: "comment" }));

    // get input
    const input = collect(args.input).only(['title', 'text']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: ['string'],
        text: ['required', 'string'],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    input.confirmed = true;

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // fill input
    input.reply_to_id = reply_to_comment._id;
    input.model_name = reply_to_comment.model_name;
    input.model_type = reply_to_comment.model_type;
    input.model_id = reply_to_comment.model_id;

    // create comment
    const comment = await CommentModel.create(input);
    return comment;
};
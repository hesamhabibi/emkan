const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CommentModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find comment
    let comment;
    try {
        comment = await CommentModel.findById(args.id);
    } catch (e) {
        comment = null;
    }
    // check comment exists
    if (!comment)
        error_res(trans('not_found', { attr: "comment" }));

    // get input
    const input = collect(args.input).only(['title', 'text']).all();

    // validate input :
    const rules = {
        title: ['string'],
        text: ['required', 'string'],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update comment
    await comment.set(input).save();

    return comment;
};
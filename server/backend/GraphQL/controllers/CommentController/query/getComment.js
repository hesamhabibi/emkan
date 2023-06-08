module.exports = async (parent, args, { models: { CommentModel }, error_res, trans }) => {
    // find comment
    let comment;
    try {
        comment = await CommentModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        comment = null;
    }
    // check comment exists
    if (!comment)
        error_res(trans('not_found', { attr: "comment" }));
    return comment;
};
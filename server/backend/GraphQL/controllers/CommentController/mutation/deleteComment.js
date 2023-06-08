module.exports = async (parent, args, { models: { CommentModel }, error_res, trans }) => {
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

    // delete comment
    await comment.delete();
    return { success: true, message: trans('done') };
};
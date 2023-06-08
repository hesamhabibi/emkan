module.exports = async (parent, args, { models: { TagModel }, error_res, trans }) => {
    // find tag
    let tag;
    try {
        tag = await TagModel.findById(args.id);
    } catch (e) {
        tag = null;
    }
    // check tag exists
    if (!tag)
        error_res(trans('not_found', { attr: "tag" }));
    // delete tag
    await tag.delete();
    return { success: true, message: trans('done') };
};
module.exports = async (parent, args, { models: { TagModel }, error_res, trans }) => {
    // find tag
    let tag;
    try {
        tag = await TagModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        tag = null;
    }
    // check tag exists
    if (!tag)
        error_res(trans('not_found', { attr: "tag" }));
    return tag;
};
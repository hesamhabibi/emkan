module.exports = async (parent, args, { models: { TagModel }, error_res, trans }) => {
    // find tag
    let tag = null;
    try {
        tag = await TagModel.findById(args.tag_id);
    } catch (e) {
        tag = null;
    }

    // check setting exists
    if (!tag)
        error_res(trans('not_found', { attr: 'tag' }));

    return tag;
};
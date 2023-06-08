module.exports = async (parent, args, { models: { MediaModel }, error_res, trans }) => {
    // find media
    let media;
    try {
        media = await MediaModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        media = null;
    }

    // check media exists
    if (!media)
        error_res(trans('not_found', { attr: "media" }));

    return media;
};
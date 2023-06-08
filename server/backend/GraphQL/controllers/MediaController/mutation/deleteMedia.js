module.exports = async (parent, args, { models: { MediaModel }, helpers: { MediaHelper: { deleteMedia } }, error_res, trans }) => {
    let media;
    try {
        media = await MediaModel.findById(args.id);
    } catch (e) {
        media = null;
    }
    if (media) {
        try {
            if ((media.relations || []).length <= 0)
                await deleteMedia(media);
        } catch { /* empty */ }
    }

    return {
        success: true,
        message: trans('done'),
    };

    // find media
    // let media;
    // try {
    //     media = await MediaModel.findById(args.id);
    // } catch (e) {
    //     media = null;
    // }
    // check media exists
    // if (!media)
    //     error_res(trans('not_found', { attr: "media" }));

    // // delete media
    // if (await deleteMedia(media))
    //     return { success: true, message: trans('done') };
    // error_res(trans('not_found', { attr: "media" }));
    // return null;
};
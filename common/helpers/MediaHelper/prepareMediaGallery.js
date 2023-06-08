const { MediaModel } = require('../../models');
const detachMedia = require('./detachMedia');
const deleteMedia = require('./deleteMedia');

module.exports = async (input_media_gallery, instance = null, last_media_gallery = null) => {

    // detach all medias in gallery from this instance
    if (Array.isArray(last_media_gallery))
        for (let i = 0; i < last_media_gallery?.length; i += 1) {
            instance = await detachMedia(instance, last_media_gallery[i].media_id);
            if (!(input_media_gallery || []).find((media) => { return (String(last_media_gallery[i].media_id) == String(media.media_id)) }))
                await deleteMedia(last_media_gallery[i].media_id);
        }

    let main_media = {
        media_id: null,
        alt: null,
        url: null,
    };
    const media_gallery = [];
    if (Array.isArray(input_media_gallery)) {
        for (let i = 0; i < input_media_gallery.length; i += 1) {
            try {
                await MediaModel.findByIdAndUpdate(input_media_gallery[i].media_id, {
                    sort: input_media_gallery[i].sort,
                    main: input_media_gallery[i].main,
                    alt: input_media_gallery[i].alt,
                });

                media_gallery.push({
                    media_id: input_media_gallery[i].media_id,
                    sort: input_media_gallery[i].sort,
                    main: input_media_gallery[i].main,
                    alt: input_media_gallery[i].alt,
                    url: input_media_gallery[i].url,
                });

                if (input_media_gallery[i].main) // set as main media if it is main
                    main_media = {
                        media_id: input_media_gallery[i].media_id,
                        alt: input_media_gallery[i].alt,
                        url: input_media_gallery[i].url,
                    };
            } catch (e) {
                console.log('error in find and update media gallery in prepareMediaGallery:', e);
            }
        }
    }
    return { media_gallery, main_media };
};
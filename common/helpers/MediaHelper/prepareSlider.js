const { MediaModel } = require('../../models');
const detachMedia = require('./detachMedia');
const deleteMedia = require('./deleteMedia');

module.exports = async (input_slider, instance = null, last_slider = null) => {

    // detach all medias in gallery from this instance
    if (Array.isArray(last_slider))
        for (let i = 0; i < last_slider?.length; i += 1) {
            instance = await detachMedia(instance, last_slider[i].media_id);
            if (!(input_slider || []).find((media) => {return (String(last_slider[i].media_id) == String(media.media_id))}))
                await deleteMedia(last_slider[i].media_id);
        }

    const slider = [];
    if (Array.isArray(input_slider)) {
        for (let i = 0; i < input_slider.length; i += 1) {
            try {
                await MediaModel.findByIdAndUpdate(input_slider[i].media_id, {
                    sort: input_slider[i].sort,
                    alt: input_slider[i].alt,
                });

                slider.push({
                    media_id: input_slider[i].media_id,
                    sort: input_slider[i].sort,
                    alt: input_slider[i].alt,
                    url: input_slider[i].url,

                    title: input_slider[i].title,
                    description: input_slider[i].description,
                    link: input_slider[i].link,
                });
            } catch (e) {
                console.log('error in find and update media gallery in prepareMediaGallery:', e);
            }
        }
    }
    return slider;
};
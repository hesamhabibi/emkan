const { MediaModel } = require('../../models');
const detachMedia = require('./detachMedia');
const deleteMedia = require('./deleteMedia');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (instance, media_id, remove_from_media_id = null) => {
    // get media or media_id as input
    let media;
    try { // try find media attached to this instance
        if (typeof media_id === 'string' || ObjectId.isValid(media_id)) {
            media = await MediaModel.findOne({ _id: media_id });
        } else if (media_id._id) {
            media = media_id;
        }
    } catch {
        media = null;
    }

    if (!media)
        return null;

    if (remove_from_media_id) {
        instance = await detachMedia(instance, remove_from_media_id);
        if (String(remove_from_media_id) !== String(media._id))
            await deleteMedia(remove_from_media_id);
    }

    // update media relations array
    const relations = media.relations || [];
    let exists = false;

    // check relation already exists in array
    for (let i = 0; i < relations.length; i += 1) {
        if (relations[i].model_name === instance.constructor.modelName && String(relations[i].model_id) === String(instance._id)) {
            exists = true;
            break;
        }
    }

    // if not exists add to array
    if (!exists) {
        relations.push({
            model_name: instance.constructor.modelName,
            model_id: instance._id,
        });
        await media.set({ relations }).save();
    }
    return instance;
};
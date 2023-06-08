const { MediaModel } = require('../../models');
const ObjectId = require('mongoose').Types.ObjectId;
const deleteMedia = require('./deleteMedia');

module.exports = async (instance, media_id) => {
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

    // update remove_from_media relations array
    const relations = media.relations || [];
    const new_relations = [];

    // check relation already exists in array
    for (let i = 0; i < relations.length; i += 1) {
        // todo : bug : (get model name from instance)
        if (!(relations[i].model_name === instance?.constructor?.modelName && String(relations[i].model_id) === String(instance._id))) {
            new_relations.push(relations[i]);
        }
    }

    await media.update({
        relations: new_relations,
    });

    // if (!(new_relations?.length > 0)) {
    //     await deleteMedia(media);
    // }

    return instance;
};
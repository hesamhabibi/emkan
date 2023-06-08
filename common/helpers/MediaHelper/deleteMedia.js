const path = require('path');
const fs = require('fs');
const ObjectId = require('mongoose').Types.ObjectId;
const { MediaModel } = require('../../models');

module.exports = async (media_id) => {
    let media;
    try { // try find media attached to this instance
        if (typeof media_id === 'string' || ObjectId.isValid(media_id)) {
            media = await MediaModel.findOne({ _id: media_id });
        } else if (media_id._id) {
            media = media_id;
        }
    } catch (e) {
        console.log(e);
        media = null;
    }

    // delete media
    try {
        const abs_filepath = path.resolve('.', media.path);
        fs.unlinkSync(abs_filepath);
        await media.delete();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
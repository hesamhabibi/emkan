const path = require('path');
const fs = require('fs');
const { media_info } = require('../MediaInfoHelper');
const { MediaModel } = require('../../models');
const validate_input = require('./validate_input');

module.exports = async (media_id, { url, path: filepath, filename }, { sort, main, alt }) => {
    let media;
    if (typeof media_id === 'object') {
        media = media_id;
    } else {
        try {
            media = await MediaModel.findById(media_id);
        } catch (e) {
            media = null;
        }
    }

    if (!media)
        return null;

    let new_input = {
        'sort': sort,
        'main': Boolean(parseInt(main, 10)),
        'alt': alt,
    };

    if (filepath) {

        // validate input
        const { validation_result } = await validate_input({ path: filepath, sort, main, alt });
        if (!validation_result.pass)
            return null;
        const abs_filepath = path.join(path.resolve('.'), filepath);

        const info = await media_info(abs_filepath);
        if (!info) {
            fs.unlinkSync(abs_filepath);
            return null;
        }

        let type = MediaModel.types.unknown;
        if (String(info.type).toLowerCase() === 'video')
            type = MediaModel.types.video;
        else if (String(info.type).toLowerCase() === 'image')
            type = MediaModel.types.image;
        else if (String(info.type).toLowerCase() === 'audio')
            type = MediaModel.types.audio;
        else if (String(info.type).toLowerCase() === 'document')
            type = MediaModel.types.document;

        new_input = {
            'is_public': media.is_public,
            'url': url,
            'path': filepath,
            'extension': info.extension,
            'sort': sort,
            'main': Boolean(parseInt(main, 10)),
            'type': type,
            'size': info.size,
            'alt': alt,
            'filename': filename,
            relations: [],
            'information': info
        };
    }

    // update database
    await media.set(new_input).save();
    return media;
};
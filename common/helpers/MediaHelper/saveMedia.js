const path = require("path");
const { media_info } = require('../MediaInfoHelper');
const { MediaModel } = require('../../models');
const validate_input = require('./validate_input');

module.exports = async ({ path: filepath, filename }, is_public, { url, sort, main, alt, user_id }, { valid_types = null }) => {

    const { validation_result } = await validate_input({ path: filepath, sort, main, alt });
    if (!validation_result.pass)
        return null;
    const abs_filepath = path.join(path.resolve('.'), filepath);

    const info = await media_info(abs_filepath);
    if (!info) {
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


    if (valid_types)
        if (Array.isArray(valid_types) && valid_types.length > 0)
            if (!valid_types.includes(type))
                return null;

    const input = {
        'is_public': is_public,
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
        'information': info,
        'user_id': user_id,
    };

    try {
        // create media
        return await MediaModel.create(input);
    } catch (e) {
        console.log(e);
        return null;
    }
};
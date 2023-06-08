const path = require('path');
const { trans } = require('../TranslateHelper');

/*
examples:
'media'
*/

const valid_extensions = [
    // image
    'png',
    'jpg',
    'jpeg',
    'bmp',
    'gif',

    // video
    'mp4',
    'avi',
    '3gp',
    'mpg',
    'ogg',
    'mpg',
    'mp2',
    'mpeg',

    // audio
    'mp3',
    'wav',
    'aiff',
    'aac',
];

module.exports = async (value, attribute, req, passes) => {
    let pass = true;
    try {
        const { filename } = await value;
        const extension = path.extname(filename).replace('.', '').toLowerCase();
        if (valid_extensions.includes(extension))
            pass = true;
        else
            pass = false;
    } catch (e) {
        console.log(e);
        pass = false;
    }
    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('media_error', { attr: req }))); }
    });

};
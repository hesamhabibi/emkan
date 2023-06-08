const ffprobe = require('ffprobe');
// const ffprobeStatic = require('ffprobe-static');
const path = require('path');
const fs = require('fs');

const media_info = async (filepath) => {
    const image_valid_extensions = [
        // image
        'png',
        'jpg',
        'jpeg',
        'webp',
        'svg',
        // 'bmp',
        // 'gif',
    ];
    const video_valid_extensions = [
        // video
        'mp4',
        // 'avi',
        // '3gp',
        // 'mpg',
        // 'ogg',
        // 'mpg',
        // 'mp2',
        // 'mpeg',
    ];
    const audio_valid_extensions = [
        // audio
        'mp3',
        'wav',
        // 'aiff',
        // 'aac',
    ];

    const document_valid_extensions = [
        // document
        'zip',
        'rar',
        'pdf',
        'doc',
        'docx',
        'ppt',
        'pptx',
        'pps',
        'pptm',
        'epub',
        'txt',
    ];

    try {
        const extension = path.extname(filepath).replace('.', '').toLowerCase();
        const { size } = fs.statSync(filepath);
        let type = 'unknown';
        if (document_valid_extensions.includes(extension)) {
            type = 'document';
        } else if (image_valid_extensions.includes(extension)) {
            type = 'image';
        } else if (video_valid_extensions.includes(extension)) {
            type = 'video';
        } else if (audio_valid_extensions.includes(extension)) {
            type = 'audio';
        }

        return {
            size,
            type,
            width: null,
            height: null,
            duration: null,
            codec_name: null,
            codec_long_name: null,
            extension,
        };
    } catch (e) {
        console.log(e);
        return null;
    }
};

module.exports = {
    media_info,
};
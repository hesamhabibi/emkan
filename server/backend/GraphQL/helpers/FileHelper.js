const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');

const get_file = async (file) => {
    try {
        return await file;
    } catch {
        return null;
    }
};

const save_file = async (file, is_public, upload_dir, custom_filename) => {
    try {
        const { createReadStream, filename } = await file;
        const extension = path.extname(filename);

        let save_filename = custom_filename;
        if (!save_filename) // generate filename
            save_filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}${extension}`; // timestamp + _ + 3 digit random + extension

        const stream = createReadStream();
        const path_prefix = is_public ? 'public/' : 'storage/';
        const dir_path = path.join(path_prefix, upload_dir);
        const filepath = path.join(dir_path, save_filename);
        const abs_filepath = path.join(path.resolve('.'), filepath);

        mkdirp.sync(dir_path); // create directory if not exists
        const result = await stream.pipe(fs.createWriteStream(abs_filepath)); // write file
        if (!result)
            return null;

        const url = is_public ? path.join(upload_dir, save_filename).replace('\\', '/') : null;

        return {
            default_filename: filename,
            filename: save_filename,
            filepath,
            abs_filepath,
            url,
        };
    } catch (e) {
        console.log(e);
        return null;
    }
};

const save_file_public = async (file, dirname = '', custom_filename) => {
    const upload_dir = process.env.PUBLIC_UPLOAD_DIR || 'upload/';
    return save_file(file, true, path.join(upload_dir, dirname), custom_filename);
};

const save_file_private = async (file, dirname = '', custom_filename) => {
    const upload_dir = process.env.PRIVATE_UPLOAD_DIR || 'upload/';
    return save_file(file, false, path.join(upload_dir, dirname), custom_filename);
};

module.exports = {
    get_file,
    save_file_public,
    save_file_private,
};
const multer = require('multer');
const path = require("path");
const mkdirp = require('mkdirp');

// const custom_filename = null;

const create_upload_middleware = (is_public = true, { dir = 'default', custom_filename = null, max_file_size = 5 * 1024 * 1024/* 5MB */ } = {}) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const upload_dir = (is_public ? process.env.PUBLIC_UPLOAD_DIR : process.env.PRIVATE_UPLOAD_DIR) || 'upload/';
                const path_prefix = (is_public ? process.env.PUBLIC_UPLOAD_FOLDER : process.env.PRIVATE_UPLOAD_FOLDER) || 'public/';
                const dir_path = path.join(path_prefix, upload_dir, dir);
                mkdirp.sync(dir_path); // create directory if not exists
                return cb(null, dir_path);
            },
            filename: (req, file, cb) => {
                const extension = path.extname(file.originalname);

                let save_filename = custom_filename;
                if (!save_filename) // generate filename
                    save_filename = `${Date.now()}_${Math.floor(Math.random() * 899) + 100}${extension}`; // timestamp + _ + 3 digit random + extension

                return cb(null, save_filename);
            },
        }),
        limits: { fileSize: max_file_size }
    });
};

module.exports = {
    create_upload_middleware,
};
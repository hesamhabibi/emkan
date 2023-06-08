const router = require("express").Router();
const { MediaModel } = require("@models");

const media_download = require("./helpers/MediaDownload");
const media_upload = require("./helpers/MediaUpload");
const media_embedded = require("./helpers/MediaEmbedded");

let route, is_public, dir, max_file_size, valid_types;

// download media
route = "/download-media";
media_download(router, route);

// upload image
route = "/upload-image";
is_public = true;
dir = "images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload textEditor image
route = "/upload-text-editor-image";
is_public = true;
dir = "text_editor_images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload audio
route = "/upload-audio";
is_public = true;
dir = "audios";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.audio];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload video
route = "/upload-video";
is_public = true;
dir = "videos";
max_file_size = 1024 * 1024 * 512; // 512MB
valid_types = [MediaModel.types.video];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload Document
route = "/upload-document";
is_public = true;
dir = "documents";
max_file_size = 1024 * 1024 * 500; // 500MB
valid_types = [MediaModel.types.document];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload File
route = "/upload-file";
is_public = true;
dir = "documents";
max_file_size = 1024 * 1024 * 500; // 500MB
valid_types = []; // all files accepted
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload blog image
route = "/upload-media-blog";
is_public = true;
dir = "blog/images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload brand image
route = "/upload-media-brand";
is_public = true;
dir = "brand/images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload category image
route = "/upload-media-category";
is_public = true;
dir = "category/images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload product image
route = "/upload-media-product";
is_public = true;
dir = "product/images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload product video
route = "/upload-video-product";
is_public = true;
dir = "product/videos";
max_file_size = 1024 * 1024 * 512; // 512MB
valid_types = [MediaModel.types.video];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload collection image
route = "/upload-image-collection";
is_public = true;
dir = "collection/images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// upload slider image
route = "/upload-image-slider";
is_public = true;
dir = "slider/images";
max_file_size = 1024 * 1024 * 5; // 5MB
valid_types = [MediaModel.types.image];
media_upload(router, route, is_public, { dir, max_file_size, valid_types });

// save embedded html
route = "/upload-embedded";
media_embedded(router, route);

module.exports = router;

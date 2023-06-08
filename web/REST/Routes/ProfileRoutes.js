const router = require('express').Router();
const MulterFileHelper = require('../helpers/MulterFileHelper');
const ResponseHelper = require('../helpers/ResponseHelper');
const { MediaModel, UserModel } = require('@models');
const { saveMedia, deleteMedia } = require('@helpers/MediaHelper');
const { trans } = require('@helpers/TranslateHelper');
const fs = require('fs');
const path = require('path');

const delete_uploaded_files = (req) => {
    for (let i in req.files) {
        try {
            const abs_filepath = path.join(path.resolve('.'), req.files[i].path);
            fs.unlinkSync(abs_filepath);
        } catch { /* empty */ }
    }
};

const AuthMiddleware = require('../middlewares/AuthMiddleware');
router.use('/upload', AuthMiddleware);
const upload = MulterFileHelper.create_upload_middleware(true, { dir: 'profile_images', max_file_size: 1024 * 1024 * 1 });
router.use('/upload', upload.any());
router.post('/upload', async (req, res, next) => {
    try {
        const file = (req.files || []).find(file => file.fieldname == 'file');
        for (let i in req.files) {
            if (!['file'].includes(req.files[i].fieldname)) {
                try {
                    const abs_filepath = path.join(path.resolve('.'), req.files[i].path);
                    fs.unlinkSync(abs_filepath);
                } catch { /* empty */ }
            }
        }

        // find user
        let user;
        try {
            user = await UserModel.findById(req.AuthUser._id);
        } catch (e) {
            user = null;
        }
        // check user exists
        if (!user)
            return ResponseHelper.throw_error_res(trans('not_found', { attr: 'user' }));

        let media;
        if (file) {
            // add url for public media
            let url = String(file.path) || null;
            try {
                const index = url.indexOf('public/');
                url = url.slice(index + 'public/'.length);
            } catch {
                /* empty */
            }

            // create media by MediaHelper
            media = await saveMedia(
                {
                    path: file.path,
                    filename: file.originalname
                },
                true,
                {
                    url,
                    sort: 0,
                    main: 0,
                    alt: '',
                    user_id: req.AuthUser._id,
                },
                {
                    valid_types: [MediaModel.types.image],
                },
            );

            // delete file if creating media failed
            if (!media) {
                delete_uploaded_files(req);
                return ResponseHelper.throw_error_res(trans('incorrect', { attr: 'file' }));
            }
        }

        let media_input;
        // delete file if validation failed
        if (media) {
            media_input = {
                media_id: media?._id,
                alt: media?.alt,
                url: media?.url,
            };
        } else {
            media_input = {
                media_id: null,
                alt: null,
                url: null,
            };
        }

        // delete last image

        const media_id = user.user_information.media.media_id;
        try {
            await deleteMedia(media_id);
        } catch {/* empty */ }

        // update user
        await user.set({
            user_information: {
                media: media_input,
            }
        }).save();

        return ResponseHelper.api_res_data(res, trans('done'));
    } catch (e) {
        delete_uploaded_files(req);
        next(e);
    }
});

module.exports = router;

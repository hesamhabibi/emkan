const fs = require('fs');
const path = require("path");

module.exports = (router, route, is_public, { dir, max_file_size, valid_types }) => {

    // middlewares
    const AuthMiddleware = require('../../middlewares/AuthMiddleware');
    const RefreshTokenMiddleware = require('../../middlewares/RefreshTokenMiddleware');

    // helpers
    const MulterFileHelper = require('../../helpers/MulterFileHelper');
    const { validate_input, saveMedia } = require('@helpers/MediaHelper');
    const ResponseHelper = require('../../helpers/ResponseHelper');
    const { trans } = require('@helpers/TranslateHelper');

    const upload = MulterFileHelper.create_upload_middleware(is_public, { dir, max_file_size });

    // add middlewares
    router.use(route, AuthMiddleware);
    router.use(route, RefreshTokenMiddleware);
    router.use(route, upload.single('file'));
    router.post(route, async (req, res, next) => {
        try {
            // get params and validate them
            // eslint-disable-next-line prefer-const
            let { alt, sort, main } = req.body || {};
            if (!sort) sort = 1;
            if (!main) main = false;

            // if file not present return error
            if (!req.file) {
                return ResponseHelper.throw_error_res(trans('required', { attr: 'file' }), { file: trans('required', { attr: 'file' }) });
            }

            const { validation_result } = await validate_input({
                // path: req.file.path,
                alt,
                sort,
                main,
            });

            // generate other fields : url, abs_path
            let url; // add url for public media | url for private media will be add after saveMedia
            if (is_public) {
                url = String(req.file.path) || null;
                try {
                    const index = url.indexOf('public/');
                    url = url.slice(index + 'public/'.length);
                } catch {
                    /* empty */
                }

                // url = String(req.file.path).replace(/\\/g, '/').replace('public/', '');
            }

            const abs_filepath = path.join(path.resolve('.'), req.file.path);

            // if (!alt) {
            //     alt = req.file.originalname;
            //     alt = alt.substring(1, alt.lastIndexOf('.'));
            // }

            // delete file if validation failed
            if (!validation_result.pass) {
                fs.unlinkSync(abs_filepath);
                return ResponseHelper.throw_error_res(trans('validation_error'), validation_result.errors);
            }

            let user_id;
            try {
                user_id = req.AuthUser.id;
            } catch {
                user_id = null;
            }

            // create media by MediaHelper
            const media = await saveMedia(
                {
                    path: req.file.path,
                    filename: req.file.originalname
                },
                is_public,
                {
                    url,
                    sort,
                    main,
                    alt,
                    user_id,
                },
                {
                    valid_types,
                },
            );

            // delete file if creating media failed
            if (!media) {
                fs.unlinkSync(abs_filepath);
                return ResponseHelper.throw_error_res(trans('incorrect', { attr: 'file' }));
            }

            // add download url for private media
            if (!is_public) {
                media.url = `api/media/download-media?id=${media._id}`;
                media.save();
            }

            // return info as result
            const result = ResponseHelper.api_res(res, media, trans('done'), null, ResponseHelper.statuses.success, process.env.SUCCESS_STATUS_CODE);
            next();
            return result;
        } catch (e) {
            next(e);
        }
    });
    return router;
};
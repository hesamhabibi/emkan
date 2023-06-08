const { MediaModel } = require('@models');

module.exports = (router, route) => {

    // middlewares
    const AuthMiddleware = require('../../middlewares/AuthMiddleware');
    const RefreshTokenMiddleware = require('../../middlewares/RefreshTokenMiddleware');

    // helpers
    const MulterFileHelper = require('../../helpers/MulterFileHelper');
    const ResponseHelper = require('../../helpers/ResponseHelper');
    const { trans } = require('@helpers/TranslateHelper');

    const upload = MulterFileHelper.create_upload_middleware();

    // add middlewares
    router.use(route, AuthMiddleware);
    router.use(route, RefreshTokenMiddleware);
    router.use(route, upload.none());
    router.post(route, async (req, res, next) => {
        try {
            // get params and validate them
            let { html } = req.body || {};

            if (!html || html == '') {
                return ResponseHelper.api_res_val_err(res, trans('validation error'), { html: [trans('required', { attr: 'html' })] });
            }

            const media = await MediaModel.create({
                is_public: true,
                is_embedded: true,
                embedded_html: html,
                user_id: req.AuthUser._id,
            });

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
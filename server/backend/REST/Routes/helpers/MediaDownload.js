const fs = require('fs');
const path = require("path");
const multer = require('multer');

module.exports = (router, route) => {

    // middlewares
    const AuthMiddleware = require('../../middlewares/AuthMiddleware');

    // helpers
    const ResponseHelper = require('../../helpers/ResponseHelper');
    const { trans } = require('@helpers/TranslateHelper');

    const { MediaModel } = require('@models');

    // add middlewares
    router.use(route, multer().none());
    router.use(route, AuthMiddleware);
    router.all(route, async (req, res, next) => {
        try {
            // get params and validate them
            const id = req?.query?.id || req?.body?.id;

            // find media
            let media;
            try {
                media = await MediaModel.findById(id).lean({ virtuals: true, defaults: true });
            } catch (e) {
                media = null;
            }

            // check media exists
            if (!media)
                return ResponseHelper.throw_error_res(trans('not_found', { attr: "media" }), process.env.ERROR_CODE_NOTFOUND);

            const abs_path = path.resolve(path.join('.', media.path));
            let content;
            try {
                content = fs.readFileSync(abs_path);
            } catch (e) {
                console.log(e);
                return res.status(process.env.ERROR_CODE_NOTFOUND).end();
            }

            res.setHeader('Content-Type', 'multipart/form-data');
            res.setHeader('Content-length', content.length);
            res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(media.filename)}"`);

            return res.end(content);
        } catch (e) {
            next(e);
        }
    });
    return router;
};
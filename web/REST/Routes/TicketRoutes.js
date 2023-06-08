const router = require('express').Router();
const MulterFileHelper = require('../helpers/MulterFileHelper');
const ResponseHelper = require('../helpers/ResponseHelper');
const { MediaModel, TicketModel } = require('@models');
const { saveMedia } = require('@helpers/MediaHelper');
const { trans } = require('@helpers/TranslateHelper');
const Validatorjs = require('validatorjs');
const ValidationHelper = require('@helpers/ValidationHelper');
const { collect } = require('collect.js');
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

// const AuthMiddleware = require('../middlewares/AuthMiddleware');
// router.use('/submit', AuthMiddleware);
const upload = MulterFileHelper.create_upload_middleware(false, { dir: 'careerForm', max_file_size: 1024 * 1024 * 5 });
router.use('/submit', upload.any());
router.post('/submit', async (req, res, next) => {
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

        // get input
        const input = collect(req.body).only(['department', 'reply_to_id', 'title', 'text', 'name', 'last_name', 'email', 'mobile']).all(); // and one files with fieldname of 'file'
        input.user_id = req.AuthUser?._id;
        input.status = TicketModel.statuses.open;
        input.number = Date.now();

        // validate input :
        const rules = {
            reply_to_id: ['exists:TicketModel,_id'],
            department: ['required'],
            title: ['string'],
            text: ['required', 'string'],
            name: ['required','string'],
            last_name: ['required','string'],
            email: ['string', 'email'],
            mobile: ['string', 'mobile'],
        };

        const validation = new Validatorjs(input, rules);
        const validation_result = await ValidationHelper.checkAsync(validation);

        // delete file if validation failed
        if (!validation_result.pass) {
            delete_uploaded_files(req);
            return ResponseHelper.throw_error_res(trans('validation_error'), validation_result.errors);
        }

        let media;
        if (file) {
            // create media by MediaHelper
            media = await saveMedia(
                {
                    path: file.path,
                    filename: file.originalname
                },
                false,
                {
                    url: null,
                    sort: 0,
                    main: 0,
                    alt: '',
                    user_id: input.user_id,
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

            // add download url for private media
            media.url = `api/media/download-media?id=${media._id}`;
            media.save();
        }

        if (media) {
            input.media = {
                media_id: media?._id,
                alt: media?.alt,
                url: media?.url,
            };
        }

        // create comment
        const ticket = await TicketModel.create(input);

        return ResponseHelper.api_res_data(res, ticket);
    } catch (e) {
        delete_uploaded_files(req);
        next(e);
    }
});

module.exports = router;

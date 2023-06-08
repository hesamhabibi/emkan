const router = require('express').Router();
const MulterFileHelper = require('../helpers/MulterFileHelper');
const ResponseHelper = require('../helpers/ResponseHelper');
const { MediaModel, CareerFormModel } = require('@models');
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

const TranslateMiddleware = require('../middlewares/TranslateMiddleware');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
router.use('/submit', TranslateMiddleware);
router.use('/submit', AuthMiddleware);
const upload = MulterFileHelper.create_upload_middleware(false, { dir: 'careerForm', max_file_size: 1024 * 1024 * 5 });
router.use('/submit', upload.any());
router.post('/submit', async (req, res, next) => {
    try {
        const picture = (req.files || []).find(file => file.fieldname == 'picture');
        const resume = (req.files || []).find(file => file.fieldname == 'resume');
        for (let i in req.files) {
            if (!['picture', 'resume'].includes(req.files[i].fieldname)) {
                try {
                    const abs_filepath = path.join(path.resolve('.'), req.files[i].path);
                    fs.unlinkSync(abs_filepath);
                } catch { /* empty */ }
            }
        }

        // get input
        const input = collect(req.body).only(['name', 'last_name', 'email', 'mobile', 'father_name', 'birth_date', 'national_code',
            'phone', 'educational_qualification', 'educational_field', 'educational_location', 'address_state', 'address_city', 'address',
            'work_experience', 'gender', 'marital_status']).all();
        input.user_id = req.AuthUser?._id;

        // validate input :
        const rules = {
            name: ['required', 'string'],
            last_name: ['required', 'string'],
            email: ['string', 'email'],
            mobile: ['required', 'mobile'],

            father_name: ['required', 'string'],
            birth_date: ['string'],
            national_code: ['string'],
            phone: ['string'],
            educational_qualification: ['string'],
            educational_field: ['string'],
            educational_location: ['string'],
            address_state: ['string'],
            address_city: ['string'],
            address: ['string'],
            work_experience: ['string'],
            gender: ['string'],
            marital_status: ['string'],
        };

        const validation = new Validatorjs(input, rules);
        const validation_result = await ValidationHelper.checkAsync(validation);

        // delete file if validation failed
        if (!validation_result.pass) {
            delete_uploaded_files(req);
            return ResponseHelper.throw_error_res(trans('validation_error'), validation_result.errors);
        }

        let picture_media;
        if (picture) {
            // create media by MediaHelper
            picture_media = await saveMedia(
                {
                    path: picture.path,
                    filename: picture.originalname
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
            if (!picture_media) {
                delete_uploaded_files(req);
                return ResponseHelper.throw_error_res(trans('incorrect', { attr: 'file' }));
            }

            // add download url for private media
            picture_media.url = `api/media/download-media?id=${picture_media._id}`;
            picture_media.save();
        }

        let resume_media;
        if (resume) {
            // create media by MediaHelper
            resume_media = await saveMedia(
                {
                    path: resume.path,
                    filename: resume.originalname
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
                    valid_types: null, // any type
                },
            );

            // delete file if creating media failed
            if (!resume_media) {
                delete_uploaded_files(req);
                return ResponseHelper.throw_error_res(trans('incorrect', { attr: 'file' }));
            }

            // add download url for private media
            resume_media.url = `api/media/download-media?id=${resume_media._id}`;
            resume_media.save();
        }

        const new_input = {
            user_name: input.name,
            user_last_name: input.last_name,
            user_email: input.email,
            user_mobile: input.mobile,
            fields: [],
            user_id: input.user_id,
        };

        new_input.fields.push({
            name: 'picture',
            title: 'تصویر 3x4',
            type: 5,
            size: 6,
            value: {
                media_id: picture_media?._id,
                alt: picture_media?.alt,
                url: picture_media?.url,
            },
        });
        new_input.fields.push({
            name: 'resume',
            title: 'رزومه',
            type: 6,
            size: 6,
            value: {
                media_id: resume_media?._id,
                alt: resume_media?.alt,
                url: resume_media?.url,
            },
        });

        new_input.fields.push({
            name: 'father_name',
            title: 'نام پدر',
            type: 1,
            size: 6,
            value: input.father_name,
        });
        new_input.fields.push({
            name: 'birth_date',
            title: 'تاریخ تولد',
            type: 1,
            size: 6,
            value: input.birth_date,
        });
        new_input.fields.push({
            name: 'national_code',
            title: 'کد ملی',
            type: 1,
            size: 6,
            value: input.national_code,
        });
        new_input.fields.push({
            name: 'phone',
            title: 'تلفن',
            type: 1,
            size: 6,
            value: input.phone,
        });
        new_input.fields.push({
            name: 'educational_qualification',
            title: 'مدرک تحصیلی',
            type: 3,
            size: 6,
            value: input.educational_qualification,
        });
        new_input.fields.push({
            name: 'educational_field',
            title: 'رشته تحصیلی',
            type: 1,
            size: 6,
            value: input.educational_field,
        });
        new_input.fields.push({
            name: 'educational_location',
            title: 'محل تحصیلی',
            type: 1,
            size: 6,
            value: input.educational_location,
        });
        new_input.fields.push({
            name: 'address_state',
            title: 'استان',
            type: 3,
            size: 6,
            value: input.address_state,
        });
        new_input.fields.push({
            name: 'address_city',
            title: 'شهر',
            type: 3,
            size: 6,
            value: input.address_city,
        });
        new_input.fields.push({
            name: 'address',
            title: 'آدرس',
            type: 1,
            size: 12,
            value: input.address,
        });
        new_input.fields.push({
            name: 'work_experience',
            title: 'سابقه کاری',
            type: 1,
            size: 12,
            value: input.work_experience,
        });
        new_input.fields.push({
            name: 'gender',
            title: 'جنسیت',
            type: 1,
            size: 6,
            value: input.gender,
        });
        new_input.fields.push({
            name: 'marital_status',
            title: 'وضعیت تاهل',
            type: 1,
            size: 6,
            value: input.marital_status,
        });

        // create comment
        const career_form = await CareerFormModel.create(new_input);

        return ResponseHelper.api_res_data(res, trans('done'));
    } catch (e) {
        delete_uploaded_files(req);
        next(e);
    }
});

module.exports = router;

const { trans } = require('../TranslateHelper');
const { SEOModel } = require('../../models');
const validate_input = require('./validate_input');
const error_codes = require('./error_codes');

module.exports = async (seo_id, data, validation_options, validation_title_field) => {
    let seo;
    if (typeof seo === 'string' || !Object.keys(seo_id).includes('_doc')) {
        // find seo
        try {
            seo = await SEOModel.findById(seo_id);
        } catch (e) {
            seo = null;
        }
    } else {
        seo = seo_id;
    }

    if (!seo)
        return {
            success: false,
            seo: null,
            errors: { seo: { default: trans('not_found', { attr: 'seo' }) } },
            code: error_codes.not_found,
        };

    const { validation_result, input } = await validate_input(data, validation_options, validation_title_field);
    if (!validation_result.pass) {
        return {
            success: false,
            seo: null,
            errors: validation_result.errors,
            code: error_codes.validation_error,
        };
    }

    try {
        seo.set(input);
        await seo.save();
        return {
            success: true,
            seo,
            errors: null,
            code: 0,
        };
    } catch {
        return {
            success: false,
            seo: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
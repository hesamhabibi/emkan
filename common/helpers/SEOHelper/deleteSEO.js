const { trans } = require('../TranslateHelper');
const { SEOModel } = require('../../models');
const error_codes = require('./error_codes');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (seo_id) => {
    // find seo
    let seo;
    if (typeof seo_id === 'string' || ObjectId.isValid(seo_id)) {
        // find seo
        try {
            seo = await SEOModel.findById(seo_id);
        } catch (e) {
            seo = null;
        }
    } else {
        seo = seo_id;
    }
    // check seo exists
    if (!seo)
        return {
            success: false,
            seo: null,
            errors: { seo: { default: trans('not_found', { attr: 'seo' }) } },
            code: error_codes.not_found,
        };

    // delete seo
    try {
        await seo.delete();
        return {
            success: true,
            seo: null,
            errors: null,
            code: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            seo: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
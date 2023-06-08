const { SEOModel } = require('../../models');
const error_codes = require('./error_codes');
const { trans } = require('../TranslateHelper');

module.exports = async (instance) => {
    let seo;
    try { // try find seo attached to this instance
        if (instance.seo_id) {
            seo = await SEOModel.findOne({ _id: instance.seo_id });
        }
        if (!seo) { // if not found in instance.seo_id try find from seo collection
            seo = await SEOModel.findOne({ model_name: instance.constructor.modelName, model_id: instance._id });
        }
    } catch {
        seo = null;
    }

    if (seo)
        return {
            success: true,
            seo,
            errors: null,
            code: 0,
        };

    return {
        success: false,
        seo: null,
        errors: { seo: { default: trans('not_found', { attr: 'seo' }) } },
        code: error_codes.not_found,
    };
};
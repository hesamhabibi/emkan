const { collect } = require('collect.js');
const getSEO = require('./getSEO');
const attachSEO = require('./attachSEO');
const error_codes = require('./error_codes');
const { trans } = require('../TranslateHelper');

module.exports = async (instance1, instance2) => {
    // from instance1 to instance2
    const get_result = await getSEO(instance1);
    if (get_result.success) {
        const seo_input = collect(get_result.seo._doc).except(['_id', 'id', 'createdAt', 'updatedAt', 'url', '__v', 'model_id', 'model_name']).all();
        return attachSEO(instance2, { ...seo_input, generate_url: instance1.title, model_name: instance1.constructor.modelName });
    }
    return {
        success: false,
        seo: null,
        instance: null,
        errors: { seo: { default: trans('not_found', { attr: 'seo' }) } },
        code: error_codes.not_found
    };
};
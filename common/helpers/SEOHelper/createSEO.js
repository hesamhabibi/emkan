const { SEOModel } = require('../../models');
const validate_input = require('./validate_input');
const error_codes = require('./error_codes');

module.exports = async (data, validation_options, validation_title_field) => {

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
        const seo = await SEOModel.create(input);
        return {
            success: true,
            seo,
            errors: null,
            code: 0
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
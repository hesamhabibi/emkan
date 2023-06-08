const { SEOModel } = require('../../models');
const createSEO = require('./createSEO');
const updateSEO = require('./updateSEO');
const error_codes = require('./error_codes');

module.exports = async (instance, data, validation_title_field) => {
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

    try {
        if (!seo) { // if seo not found then create new
            const create_result = await createSEO(data, instance, validation_title_field);
            if (create_result.success) {
                seo = create_result.seo;
            } else { // if create seo is not success then return null
                return {
                    success: false,
                    seo: null,
                    instance: null,
                    errors: create_result.errors,
                    code: create_result.validation_error,
                };
            }
        } else { // if seo exists then update it
            const update_result = await updateSEO(seo, data, instance, validation_title_field);
            if (update_result.success) {
                seo = update_result.seo;
            } else { // if update seo is not success then return null
                return {
                    success: false,
                    seo: null,
                    instance: null,
                    errors: update_result.errors,
                    code: update_result.validation_error,
                };
            }
        }
    } catch (e) { // if any error occurred return null
        return {
            success: false,
            seo: null,
            instance: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }

    // update relations:
    try {
        seo.set({
            model_name: instance.constructor.modelName,
            model_id: instance._id,
        });
        await seo.save();
        instance.set({
            seo_id: seo._id,
        });
        await instance.save();
        return {
            success: true,
            seo,
            instance,
            errors: null,
            code: error_codes.unexpected_error,
        };

    } catch { // if any error occurred return null
        return {
            success: false,
            seo: null,
            instance: null,
            errors: null,
            code: error_codes.unexpected_error,
        };
    }
};
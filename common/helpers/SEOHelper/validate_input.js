const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const ValidationHelper = require('../ValidationHelper');
const { SEOModel } = require('../../models');
const generateURL = require('./generateURL');
const { multilang_rules, extract_main_title, multilang_remove_extra_fields } = require('../MultiLangHelper');

module.exports = async (data, options, title_field = 'title') => {
    let generate_url;
    let model_name;
    let unique_key;
    let seo_id;

    try {
        if (options.generate_url) {
            generate_url = options.generate_url;
            model_name = options.model_name;
            unique_key = options.unique_key;
            seo_id = options.seo_id;
        } else {
            generate_url = options[title_field];
            model_name = options.constructor.modelName;
            if (model_name === 'BlogModel')
                unique_key = options?.type; // just work for blog
            seo_id = options.seo_id;
        }
    } catch (e) {
        console.log(e);
    }
    const input = collect({ ...data, unique_key }).only(['title', 'description', 'keywords', 'url', 'unique_key', 'canonical_url', 'redirect_url_301', 'redirect_url_404', 'robots_status']).all();

    if (input.url) {
        input.url_status = SEOModel.url_statuses.custom;
    } else {
        input.url = await generateURL(await extract_main_title(generate_url), seo_id);
        input.url_status = SEOModel.url_statuses.auto;
    }

    let url_unique_query;
    if (model_name) {
        if (seo_id)
            url_unique_query = { model_name, unique_key, _id: { "$ne": seo_id } };
        else
            url_unique_query = { model_name, unique_key };
    } else {
        if (seo_id)
            url_unique_query = { _id: { "$ne": seo_id } };
        else
            url_unique_query = null;
    }

    // validate input :
    const rules = {
        'url': ['required', { 'unique': { model: SEOModel, field: 'url', query: url_unique_query } }],
        'title': multilang_rules(['string']),
        'description': multilang_rules(['string']),
        'keywords': multilang_rules(['string']),
        'url_status': [{ in: Object.values(SEOModel.url_statuses) }],
        'canonical_url': 'string',
        'redirect_url_301': 'string',
        'redirect_url_404': 'string',
        'robots_status': [{ in: Object.values(SEOModel.robots_statuses) }],
    };

    const validation = new Validatorjs({ seo_input: input }, { seo_input: rules });
    const validation_result = await ValidationHelper.checkAsync(validation);

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);
    input.keywords = await multilang_remove_extra_fields(input.keywords);

    return { validation_result, input };
};
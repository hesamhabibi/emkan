
const extract_main_title = async (title) => {
    const { get_setting, static_keys } = require('./SettingHelper');

    let test_title;
    if (typeof title === 'object') {
        try {
            const main_language = await get_setting(static_keys.web_default_language);
            if (title[main_language]) {
                test_title = title[main_language];
            } else {
                test_title = title[Object.keys(title)[0]];
            }
        } catch (e) {
            test_title = undefined;
        }
    } else if (typeof title === 'string') {
        test_title = title;
    }
    return test_title;
};

const get_fields = async (type = 'web') => {
    const { get_setting, static_keys } = require('./SettingHelper');

    let language_codes;
    let default_language_code;

    if (type == 'panel') {
        try {
            const setting = await get_setting(static_keys.panel_languages);
            language_codes = setting.value.map(lang => lang.code);
        } catch (e) {
            language_codes = ['en', 'fa'];
        }
        try {
            const panel_default_language = await get_setting(static_keys.panel_default_language);
            default_language_code = panel_default_language.value.code;
        } catch (e) {
            console.log('error in get settings:', e);
            default_language_code = 'fa';
        }
    } else {
        try {
            const setting = await get_setting(static_keys.web_languages);
            language_codes = setting.value.map(lang => lang.code);
        } catch (e) {
            console.log('error in get settings:', e);
            language_codes = ['en', 'fa'];
        }
        try {
            const web_default_language = await get_setting(static_keys.web_default_language);
            default_language_code = web_default_language.value.code;
        } catch (e) {
            console.log('error in get settings:', e);
            default_language_code = 'fa';
        }
    }

    return {
        language_codes,
        default_language_code,
    };
};

const multilang_rules = async (rules = 'required', type = 'web', default_language_rules = null) => {

    const { default_language_code, language_codes: valid_keys } = await get_fields(type);

    const result = {};

    for (let i = 0; i < valid_keys.length; i += 1) {
        if (default_language_rules && valid_keys[i] === default_language_code) {
            result[valid_keys[i]] = default_language_rules;
        } else {
            result[valid_keys[i]] = rules;
        }
    }
    return result;
};

const multilang_remove_extra_fields = async (fields, type = 'web') => {
    const { language_codes } = await get_fields(type);
    const result = {};
    for (let i = 0; i < language_codes.length; i += 1) {
        try {
            result[language_codes[i]] = fields[language_codes[i]] || null;
        } catch (e) {
            // console.log(`${language_codes[i]} language not found `, e);
        }
    }

    return result;
};

module.exports = {
    extract_main_title,
    multilang_rules,
    multilang_remove_extra_fields,
};
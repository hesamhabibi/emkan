const { trans } = require('../TranslateHelper');
const { get_setting } = require('../SettingHelper');

module.exports = async (value, attribute, req, passes) => {
    let pass = true;
    let valid_keys;
    try {
        if (attribute == 'panel') {
            try {
                const setting = await get_setting('panel_content_languages');
                valid_keys = setting.value.map(lang => lang.code);
            } catch (e) {
                valid_keys = ['en', 'fa'];
            }
        } else {
            try {
                const setting = await get_setting('web_content_languages');
                valid_keys = setting.value.map(lang => lang.code);
            } catch (e) {
                console.log('error in get settings:', e);
                valid_keys = ['en', 'fa'];
            }
        }

        if (typeof value == 'object') {
            const keys = Object.keys(value);
            for (let i = 0; i < keys.length; i += 1) {
                if (!valid_keys.includes(keys[i]) || typeof value[keys[i]] !== 'string') {
                    pass = false;
                    break;
                }
            }
        } else {
            pass = false;
        }
    } catch (e) {
        console.log(e);
        pass = false;
    }

    return new Promise((resolve) => {
        if (pass) {
            resolve(passes());
        } else {
            resolve(passes(false, trans('not_multilang_error', { attr: req, langs: JSON.stringify(valid_keys) })));
        }
    });

};
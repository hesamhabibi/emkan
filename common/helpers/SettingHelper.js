const { SettingModel } = require('../models');

const static_keys = {
    panel_languages: 'panel_content_languages',
    web_languages: 'web_content_languages',
    panel_default_language: 'panel_default_language',
    web_default_language: 'web_default_language',
};

const get_setting = async (key) => {

    let setting;
    try {
        setting = await SettingModel.findByKey(key);
    } catch (e) {
        setting = null;
    }

    return setting;
};

module.exports = {
    static_keys,
    get_setting
};
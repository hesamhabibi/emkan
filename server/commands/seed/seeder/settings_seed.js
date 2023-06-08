/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { SettingModel } = require('@models');
const settings = require('./settings_data/settings');

module.exports = async (type = null) => {
    for (let i = 0; i < settings.length; i += 1) {
        try {
            if (await SettingModel.exists({ key: settings[i].key }))
                if (type == 'soft')
                    delete settings[i].value;
                else if (type == 'very_hard') { // delete all setting
                    await SettingModel.deleteMany({});
                }
            if (!settings[i].group)
                settings[i].group = SettingModel.default_group;
            const result = await SettingModel.updateOne({ key: settings[i].key }, settings[i], { upsert: true, setDefaultsOnInsert: true });
            if (result.upserted)
                console.log('> setting with "', settings[i].key, '" key added!');
        } catch (e) {
            console.log(e);
        }
    }
};
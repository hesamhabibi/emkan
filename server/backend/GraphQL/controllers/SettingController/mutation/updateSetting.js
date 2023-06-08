const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { get_setting } = require('@helpers/SettingHelper');

module.exports = async (parent, args, { models: { SettingModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // find setting
    let setting;
    try {
        setting = await SettingModel.findById(args.id);
    } catch (e) {
        setting = null;
    }
    // check setting exists
    if (!setting)
        error_res(trans('not_found', { attr: "setting" }));

    // get input
    const input = collect(args.input).only(['name', 'key', 'description', 'format', 'value']).all();
    input.user_id = AuthUser._id;
    // validate input :
    const rules = {
        name: ['multilang:panel'],
        key: ['string'],
        description: ['multilang:panel'],
        format: [{ in: Object.values(SettingModel.formats) }],
        // value: ['required'],
    };


    // Validate Value:
    switch (input.key) {
        case 'panel_default_language':
        case 'web_default_language':
            rules.value = {
                code: ['required', 'string'],
                name_auto: ['required', 'string'],
                direction: ['required', 'string'],
            };
            break;
        case 'panel_content_languages':
        case 'web_content_languages':
            rules['value.*'] = {
                code: ['required', 'string'],
                name_auto: ['required', 'string'],
                direction: ['required', 'string'],
            };
            break;
        case 'logo_image':
            rules.value = {
                url: ['required', 'string'],
                media_id: ['required', 'string'],
                alt: 'string',
            };
            break;
        case 'reports_send_via':
            rules.value = [{ in: Object.values({ 'dont_send': 0, 'email': 1, 'sms': 2 }) }];
            break;
        case 'current_city':
            rules.value = [{ in: Object.values(await get_setting('all_cities')) }];
            break;
        case 'neighboring_states':
            rules['value.*'] = [{ in: Object.values(await get_setting('all_states')) }];
            break;
    }

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update setting
    await setting.set(input).save();
    return setting;
};
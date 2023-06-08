const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { SettingModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['name', 'key', 'description', 'format', 'value']).all();
    input.user_id = AuthUser.id;
    input.group = "user";

    // validate input :
    const rules = {
        name: ['required', 'multilang:panel'],
        key: ['required', 'string'],
        description: ['multilang:panel'],
        format: ['required', { in: [SettingModel.formats.string, SettingModel.formats.big_text, SettingModel.formats.integer, SettingModel.formats.bool, SettingModel.formats.float] }],
        // value:'',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    input.is_main = false;

    // create setting
    const setting = await SettingModel.create(input);
    return setting;
};
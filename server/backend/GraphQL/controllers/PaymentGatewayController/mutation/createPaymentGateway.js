const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { SettingModel } = require('@models');
const { get_setting } = require('@helpers/SettingHelper');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['title', 'gateway', 'status', 'fields']).all();

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        gateway: 'required',
        status: ['required', 'boolean'],
        // fields: 'JSON',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);

    // find payment_gateways
    let setting;
    let all_payment_gateways;
    try {
        setting = await get_setting('payment_gateways');
        all_payment_gateways = setting.value;
    } catch {
        setting = null; // todo: create setting if not exists
        all_payment_gateways = [];
    }

    // find last id
    let id = 0;
    for (let i in all_payment_gateways) {
        if (parseInt(id) < parseInt(all_payment_gateways[i].id)) {
            id = parseInt(all_payment_gateways[i].id);
        }
    }

    id += 1;

    // create payment_gateway
    const payment_gateway = {
        ...input,
        id: id,
    };

    all_payment_gateways.push(payment_gateway);

    // setting.value = all_payment_gateways;
    // await setting.save();
    await SettingModel.updateOne({ _id: setting._id }, { value: all_payment_gateways });

    return payment_gateway;
};
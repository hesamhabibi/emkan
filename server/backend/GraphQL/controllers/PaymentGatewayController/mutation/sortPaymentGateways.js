const { SettingModel } = require('@common/models');

module.exports = async (parent, args) => {
    const sorts = args.input;

    const setting = await SettingModel.findOne({ key: 'payment_gateways' });

    let payment_gateways = setting.value || [];

    payment_gateways = payment_gateways.map((pg) => {
        const sort = sorts.find((s) => String(s.id) == String(pg.id))?.sort;
        pg.sort = sort;
        return pg;
    });

    payment_gateways = payment_gateways.sort((pg1, pg2) => {
        return parseInt(pg1.sort) - parseInt(pg2.sort);
    });

    setting.value = payment_gateways;

    await setting.save();
};
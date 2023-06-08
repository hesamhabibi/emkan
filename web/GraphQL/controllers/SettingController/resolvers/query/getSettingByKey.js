module.exports = async (parent, args, { models: { SettingModel }, error_res, trans, web_local }) => {
    // find setting
    let setting = null;
    try {
        setting = await SettingModel.findByKey(args.key, { web_local });
    } catch (e) {
        setting = null;
    }

    // check setting exists
    if (!setting)
        error_res(trans('not_found', { attr: 'setting' }));

    return setting;
};
module.exports = async (parent, args, { models: { SettingModel }, error_res, trans, panel_local, web_local }) => {
    // find setting
    let setting = null;
    try {
        setting = await SettingModel.findByKey(args.key, { panel_local, web_local });
    } catch (e) {
        console.log(e);
        setting = null;
    }

    // check setting exists
    if (!setting)
        error_res(trans('not_found', { attr: "setting" }));

    return setting;
};
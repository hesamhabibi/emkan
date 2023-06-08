module.exports = async (parent, args, { models: { SettingModel }, error_res, trans }) => {
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
    // check setting is main
    if (setting.is_main)
        error_res(trans('access_error'));

    // delete setting
    await setting.delete();
    return { success: true, message: trans('done') };
};
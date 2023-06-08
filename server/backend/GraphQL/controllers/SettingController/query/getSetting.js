module.exports = async (parent, args, { models: { SettingModel }, error_res, trans }) => {
    // find setting
    let setting;
    try {
        setting = await SettingModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        setting = null;
    }
    // check setting exists
    if (!setting)
        error_res(trans('not_found', { attr: "setting" }));
    return setting;
};
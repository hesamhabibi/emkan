module.exports = async (parent, args, { models: { SettingModel } }) => {
    const settings = SettingModel.find({ key: { $in: args.keys } });
    return settings;
};
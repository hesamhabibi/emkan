module.exports = async (parent, args, { models: { SettingModel } }) => {
    try {
        const tutorials = (await SettingModel.findByKey("all_tutorial_files")).value;

        const result = tutorials.find((el) => {
            return el.key == parent.file_key;
        })

        return result;
    } catch (e) {
        return null;
    }
};
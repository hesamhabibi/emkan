module.exports = async (parent, args, { models: { SettingModel } }) => {
    try {
        const all_states = await SettingModel.findByKey('all_states');
        return all_states.value.find((item) => {
            return String(item.id) == parent.state_id;
        });
    } catch (e) {
        return null;
    }
};
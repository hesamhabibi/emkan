module.exports = async (parent, args, { models: { SettingModel } }) => {
    try {
        const all_cities = await SettingModel.findByKey('all_cities');
        return all_cities.value.find((item) => {
            return String(item.id) == parent.city_id;
        });
    } catch (e) {
        return null;
    }
};
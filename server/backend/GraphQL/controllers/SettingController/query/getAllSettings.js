const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { SettingModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "group", type: 1 });
    const setting = await SettingModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return setting;
};
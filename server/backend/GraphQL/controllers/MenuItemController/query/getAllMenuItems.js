const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { MenuItemModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "sort", type: 1 });
    const menu_items = await MenuItemModel.find(query).sort(sort);
    return menu_items;
};
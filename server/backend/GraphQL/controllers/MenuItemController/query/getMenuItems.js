const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { MenuItemModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "sort", type: 1 });
    const menu_items = await MenuItemModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: menu_items.totalDocs,
            page: menu_items.page,
            pages: menu_items.totalPages,
            limit: menu_items.limit,
        },
        data: menu_items.docs
    };
};
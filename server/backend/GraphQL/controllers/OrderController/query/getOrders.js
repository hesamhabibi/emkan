const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { OrderModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter, { type: OrderModel.types.complete });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const orders = await OrderModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: orders.totalDocs,
            page: orders.page,
            pages: orders.totalPages,
            limit: orders.limit,
        },
        data: orders.docs
    };
};
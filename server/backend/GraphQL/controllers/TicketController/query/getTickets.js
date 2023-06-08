const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { TicketModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter, {/* todo: just to fix panel bug */ reply_to_id: null });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const tickets = await TicketModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: tickets.totalDocs,
            page: tickets.page,
            pages: tickets.totalPages,
            limit: tickets.limit,
        },
        data: tickets.docs
    };
};
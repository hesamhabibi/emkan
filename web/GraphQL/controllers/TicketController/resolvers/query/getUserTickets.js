module.exports = async (parent, args, { models: { TicketModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const tickets = await TicketModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort: { "createdAt": -1 } });
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
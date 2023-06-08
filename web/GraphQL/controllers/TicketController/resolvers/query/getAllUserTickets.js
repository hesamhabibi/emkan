module.exports = async (parent, args, { models: { TicketModel }, error_res, AuthUser }) => {
    // todo: filter by search text
    const query = {
        user_id: AuthUser._id,
    };
    if (args?.filter?.department)
        query.department = args.filter.department;

    if (args?.filter?.status)
        query.status = args.filter.status;

    query.reply_to_id = args?.filter?.reply_to_id;

    const tickets = await TicketModel.find(query).lean({ virtuals: true, defaults: true })
        .sort({ [args.sort?.field || 'createdAt']: (args.sort?.operator || process.env.SORT_DEFAULT_OPERATOR) == 'asc' ? 1 : -1 });
    return tickets;
};
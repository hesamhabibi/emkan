const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { ReminderModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const reminders = await ReminderModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: reminders.totalDocs,
            page: reminders.page,
            pages: reminders.totalPages,
            limit: reminders.limit,
        },
        data: reminders.docs
    };
};
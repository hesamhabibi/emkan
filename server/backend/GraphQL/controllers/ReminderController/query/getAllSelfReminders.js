const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { ReminderModel }, helpers: { FilterHelper: { filter_query } }, AuthUser }) => {
    const query = await filter_query(args.filter, { "$or": [{ user_id: AuthUser.id }, { access_user_ids: AuthUser.id }] });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const reminders = await ReminderModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return reminders;
};
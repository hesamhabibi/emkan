module.exports = async (parent, args, { models: { ReminderModel }, AuthUser }) => {
    const { date_start } = args;
    const { date_end } = args;
    const { type } = args;

    const self_query = { "$or": [{ user_id: AuthUser.id }, { access_user_ids: AuthUser.id }] };
    const in_date_query = {
        "$or": [
            {
                "$and": [
                    { start_date: { "$gt": date_start } },
                    { start_date: { "$lt": date_end } },
                ]
            },
            {
                "$and": [
                    { end_date: { "$gt": date_start } },
                    { end_date: { "$lt": date_end } }
                ],
            },
            {
                "$and": [
                    { start_date: { "$lt": date_start } },
                    { end_date: { "$gt": date_start } },
                ]
            },
            {
                "$and": [
                    { start_date: { "$lt": date_end } },
                    { end_date: { "$gt": date_end } }
                ],
            },
        ]
    };
    const query = {
        "$and": [
            self_query,
            in_date_query,
            { type }
        ]
    };
    const reminders = await ReminderModel.find(query).lean({ virtuals: true, defaults: true });
    return reminders;
};
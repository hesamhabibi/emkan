module.exports = async (parent, args, { models: { ReminderModel }, AuthUser }) => {

    const { keys = [] } = args;
    if (!Array.isArray(keys))
        return {};

    const const_keys = {
        calender_reminder_badge: 'calender_reminder_badge',
    };

    const result = {};

    if (keys.includes(const_keys.calender_reminder_badge)) {
        const self_query = { "$or": [{ user_id: AuthUser.id }, { for_every_one: true }] };
        const today = new Date();
        const date_start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
        const date_end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime();
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
        result[const_keys.calender_reminder_badge] = await ReminderModel.find({ '$and': [self_query, in_date_query] }).countDocuments();
    }

    return result;
};
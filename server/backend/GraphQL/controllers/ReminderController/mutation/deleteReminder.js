module.exports = async (parent, args, { models: { ReminderModel }, error_res, trans }) => {
    // find reminder
    let reminder;
    try {
        reminder = await ReminderModel.findById(args.id);
    } catch (e) {
        reminder = null;
    }
    // check reminder exists
    if (!reminder)
        error_res(trans('not_found', { attr: "reminder" }));
    // delete reminder
    await reminder.delete();
    return { success: true, message: trans('done') };
};
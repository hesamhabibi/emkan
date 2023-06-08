const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { ReminderModel }, helpers: { ValidationHelper }, error_res, trans }) => {
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

    // get input
    const input = collect(args.input).only(['start_date', 'end_date', 'title', 'description', 'access_user_ids', 'type', 'can_edit']).all();

    // validate input :
    const rules = {
        start_date: ['required', 'timestamp'],
        end_date: 'timestamp',
        title: ['required', 'string'],
        description: 'string',
        'access_user_ids.*': 'exists:UserModel,_id',
        type: "integer",
        can_edit: 'boolean',
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update reminder
    await reminder.set(input).save();
    return reminder;
};
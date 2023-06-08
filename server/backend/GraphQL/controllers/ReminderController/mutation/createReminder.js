const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { ReminderModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['start_date', 'end_date', 'title', 'description', 'access_user_ids', 'type', 'can_edit']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        start_date: ['required', 'timestamp'],
        end_date: 'timestamp',
        title: ['required', 'string'],
        description: 'string',
        'access_user_ids.*': 'exists:UserModel,_id',
        type: 'integer',
        can_edit: 'boolean',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // create reminder
    let reminder;
    reminder = await ReminderModel.create(input);
    return reminder;
};
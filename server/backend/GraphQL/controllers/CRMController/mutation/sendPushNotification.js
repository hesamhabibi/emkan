const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CRMModel, TaskModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'message', 'link', 'send_to', 'date']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        title: ['required', 'string'],
        message: ['required', 'string'],
        link: ['string'],
        'send_to.*': {
            receiver_user_id: ['required', 'string'],
        },
        date: 'timestamp',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // clean send_to and add seen field
    input.send_to = input.send_to?.reduce((send_to_array, send_to_item) => {
        if ((typeof send_to_item === 'object') &&
            (
                (typeof send_to_item.receiver_user_id === 'string' && send_to_item.receiver_user_id != '' && send_to_item.receiver_user_id != null)
            )) {
            send_to_array.push({
                receiver_user_id: send_to_item.receiver_user_id,
                seen: 1,
            });
        }
        return send_to_array;
    }, []);

    // send sms
    if (!input.date)
        input.date = Date.now();

    const crm = await CRMModel.create({
        title: input.title,
        message: input.message,
        link: input.link,
        type: CRMModel.types.push_notification,
        send_to: input.send_to || [],
        date: input.date,
        status: CRMModel.statuses.pending,
        response: null,
        user_id: input.user_id,
    });

    await TaskModel.create({
        type: TaskModel.types.send_push_notification_array,
        data: {
            crm_id: crm._id,
        },
        date: input.date,
        done: false,
    });
    return crm;
};
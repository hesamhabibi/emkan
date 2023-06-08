const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { CRMModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'message', 'kind', 'send_to', 'status', 'date', 'response']).all();
    input.user_id = AuthUser.id;
    input.type = CRMModel.types.external_message;

    // validate input :
    const rules = {
        title: ['required', 'string'],
        message: ['required', 'string'],
        // kind: '',
        // send_to: '',
        // status:'',
        date: 'timestamp',
        // response: '',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const crm = await CRMModel.create(input);
    return crm;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { ReportModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser, req }) => {

    // get input
    const input = collect(args.input).only(['action', 'action_type', 'parameters', 'error', 'response', 'status_code', 'status', 'device_info']).all();

    // validate input :
    const rules = {
        action: 'string',
        action_type: 'integer',
        // parameters: '',
        // error: '',
        // response: '',
        status_code: 'integer',
        status: 'integer',
        // device_info: '',
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    if (!input.status) {
        input.status = ReportModel.statuses.active;
    }

    let ip_split = ['unknown'];
    try {
        ip_split = req.ip.split(':');
    } catch (e) {
        console.log(e);
    }
    input.device_info = {
        ip: req.ip,
        ipv4: ip_split[ip_split.length - 1],
        user_agent: req.headers['User-Agent'],
        ...input.device_info,
    };

    // add details
    input.user_id = AuthUser && AuthUser.id;
    input.department = ReportModel.departments.frontend;

    // create report
    let report;
    report = await ReportModel.create(input);
    return report;
};
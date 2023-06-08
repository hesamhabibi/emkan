const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { ReportModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find report
    let report;
    try {
        report = await ReportModel.findById(args.id);
    } catch (e) {
        report = null;
    }
    // check report exists
    if (!report)
        error_res(trans('not_found', { attr: "report" }));

    // get input
    const input = collect(args).only(['status']).all();

    // validate input :
    const rules = {
        status: ['required', { in: Object.values(ReportModel.statuses) }],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update report
    await report.set(input).save();
    return report;
};
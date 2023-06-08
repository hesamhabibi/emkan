module.exports = async (parent, args, { models: { ReportModel }, error_res, trans }) => {
    // find report
    let report;
    try {
        report = await ReportModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        report = null;
    }
    // check report exists
    if (!report)
        error_res(trans('not_found', { attr: "report" }));
    return report;
};
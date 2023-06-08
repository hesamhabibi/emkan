module.exports = async (parent, args, { models: { ReportModel }, error_res, trans }) => {
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
    // delete report
    await report.delete();
    return { success: true, message: trans('done') };
};
module.exports = async (parent, args, { models: { CRMModel }, error_res, trans }) => {
    // find crm
    let crm;
    try {
        crm = await CRMModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        crm = null;
    }
    // check crm exists
    if (!crm)
        error_res(trans('not_found', { attr: "crm" }));
    return crm;
};
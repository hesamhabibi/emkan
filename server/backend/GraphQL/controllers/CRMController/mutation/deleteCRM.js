module.exports = async (parent, args, { models: { CRMModel }, error_res, trans }) => {
    // find crm
    let crm;
    try {
        crm = await CRMModel.findById(args.id);
    } catch (e) {
        crm = null;
    }
    // check crm exists
    if (!crm)
        error_res(trans('not_found', { attr: "crm" }));
    // todo: delete task if not started yet
    // delete crm
    await crm.delete();
    return { success: true, message: trans('done') };
};
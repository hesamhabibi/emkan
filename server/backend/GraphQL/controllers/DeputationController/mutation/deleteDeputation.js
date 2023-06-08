module.exports = async (parent, args, { models: { DeputationModel }, error_res, trans }) => {
    // find deputation
    let deputation;
    try {
        deputation = await DeputationModel.findById(args.id);
    } catch (e) {
        deputation = null;
    }
    // check deputation exists
    if (!deputation)
        error_res(trans('not_found', { attr: "deputation" }));
    // delete deputation
    await deputation.delete();
    return { success: true, message: trans('done') };
};
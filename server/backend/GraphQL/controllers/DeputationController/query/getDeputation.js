module.exports = async (parent, args, { models: { DeputationModel }, error_res, trans }) => {
    // find deputation
    let deputation;
    try {
        deputation = await DeputationModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        deputation = null;
    }
    // check deputation exists
    if (!deputation)
        error_res(trans('not_found', { attr: "deputation" }));
    return deputation;
};
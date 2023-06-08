module.exports = async (parent, args, { models: { AccessComponentModel }, error_res, trans }) => {
    // find accessComponent
    let accessComponent;
    try {
        accessComponent = await AccessComponentModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        accessComponent = null;
    }

    // check accessComponent exists
    if (!accessComponent)
        error_res(trans('not_found', { attr: "access_component" }));

    return accessComponent;
};
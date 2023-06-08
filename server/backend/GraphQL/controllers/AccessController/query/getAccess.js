module.exports = async (parent, args, { models: { AccessModel }, error_res, trans, is_developer }) => {
    // check developer access
    if (!is_developer && String(args.id) === process.env.DEVELOPER_ACCESS_ID)
        error_res(trans('not_found', { attr: "access_model" }));

    // find access
    let access;
    try {
        access = await AccessModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        access = null;
    }

    // check access exists
    if (!access)
        error_res(trans('not_found', { attr: "access_model" }));

    return access;
};
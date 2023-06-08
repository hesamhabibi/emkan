module.exports = async (parent, args, { models: { AccessControlListModel }, error_res, trans }) => {
    // find accessControlList
    let accessControlList;
    try {
        accessControlList = await AccessControlListModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        accessControlList = null;
    }

    // check accessControlList exists
    if (!accessControlList)
        error_res(trans('not_found', { attr: "access_control_list" }));

    return accessControlList;
};
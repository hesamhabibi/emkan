module.exports = async (parent, args, { models: { AccessModel, UserModel, MenuItemModel, AccessControlListModel }, error_res, trans }) => {
    // find access
    let access;
    try {
        access = await AccessModel.findById(args.id);
    } catch (e) {
        access = null;
    }
    // check access exists
    if (!access)
        error_res(trans('not_found', { attr: "access_model" }));
    // delete access
    // set to null MenuItem > access_id
    try {
        await MenuItemModel.updateMany({ access_id: access.id }, { access_id: null });
    } catch (e) {
        console.log(e);
    }
    // set to null user > access_id
    try {
        await UserModel.updateMany({ access_id: access.id }, { access_id: null });
    } catch (e) {
        console.log(e);
    }
    // delete access control list
    try {
        await AccessControlListModel.deleteMany({ access_id: access.id });
    } catch (e) {
        console.log(e);
    }
    await access.delete();

    return { success: true, message: trans('done') };
};
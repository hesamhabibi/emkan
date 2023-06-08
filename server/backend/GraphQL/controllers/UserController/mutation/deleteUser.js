module.exports = async (parent, args, { models: { UserModel }, error_res, trans }) => {
    // find user
    let user;
    try {
        user = await UserModel.findById(args.id);
    } catch (e) {
        user = null;
    }
    // check user exists
    if (!user)
        error_res(trans('not_found', { attr: "user" }));
    // delete user
    await user.delete();
    return { success: true, message: trans('done') };
};
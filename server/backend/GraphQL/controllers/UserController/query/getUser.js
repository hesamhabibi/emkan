module.exports = async (parent, args, { models: { UserModel }, error_res, trans, is_developer }) => {

    // find user
    let user;
    try {
        user = await UserModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        user = null;
    }
    // check user exists
    if (!user)
        error_res(trans('not_found', { attr: "user" }));

    // check developer access
    if (!is_developer && String(user.access_id) === process.env.DEVELOPER_ACCESS_ID)
        error_res(trans('not_found', { attr: "access_model" }));

    return user;
};
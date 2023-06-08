module.exports = async (parent, args, { AuthUser, error_res, trans }) => {
    if (AuthUser)
        return AuthUser;
    error_res(trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE);
    return null;
};
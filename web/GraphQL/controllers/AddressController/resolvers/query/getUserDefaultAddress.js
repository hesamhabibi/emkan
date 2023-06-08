module.exports = async (parent, args, { models: { AddressModel }, error_res, AuthUser, trans }) => {
    if (!AuthUser)
        error_res(trans('authenticate_error'), {}, process.env.ERROR_CODE_AUTHENTICATE);

    let address;
    try {
        address = await AddressModel.findOne({ model_id: AuthUser._id, is_default: true });
    } catch (e) {
        address = null;
    }

    // check address exists
    if (!address)
        error_res(trans('not_found', { attr: 'address' }));

    return address;
};
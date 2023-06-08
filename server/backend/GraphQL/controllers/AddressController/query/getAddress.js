module.exports = async (parent, args, { models: { AddressModel }, error_res, trans }) => {
    // find address
    let address;
    try {
        address = await AddressModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        address = null;
    }
    // check address exists
    if (!address)
        error_res(trans('not_found', { attr: "address" }));
    return address;
};
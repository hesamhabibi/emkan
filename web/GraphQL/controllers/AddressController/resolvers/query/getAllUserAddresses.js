module.exports = async (parent, args, { models: { AddressModel }, helpers: { FilterHelper: { filter_query } }, AuthUser }) => {
    const query = await filter_query(args.filter, { model_id: AuthUser._id });
    const addresses = await AddressModel.find(query).lean({ virtuals: true, defaults: true });
    return addresses;
};
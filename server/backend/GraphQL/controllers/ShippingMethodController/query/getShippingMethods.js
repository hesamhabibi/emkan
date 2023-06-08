const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { ShippingMethodModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const shipping_methods = await ShippingMethodModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: shipping_methods.totalDocs,
            page: shipping_methods.page,
            pages: shipping_methods.totalPages,
            limit: shipping_methods.limit,
        },
        data: shipping_methods.docs
    };
};
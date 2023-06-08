const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { ProductModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const products = await ProductModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: products.totalDocs,
            page: products.page,
            pages: products.totalPages,
            limit: products.limit,
        },
        data: products.docs
    };
};
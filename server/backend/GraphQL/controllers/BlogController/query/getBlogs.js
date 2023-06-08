const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { BlogModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort);
    const blogs = await BlogModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: blogs.totalDocs,
            page: blogs.page,
            pages: blogs.totalPages,
            limit: blogs.limit,
        },
        data: blogs.docs
    };
};
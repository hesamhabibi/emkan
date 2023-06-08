const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { CommentModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const comments = await CommentModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: comments.totalDocs,
            page: comments.page,
            pages: comments.totalPages,
            limit: comments.limit,
        },
        data: comments.docs
    };
};
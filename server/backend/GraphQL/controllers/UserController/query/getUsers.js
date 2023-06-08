const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { UserModel }, helpers: { FilterHelper: { filter_query } }, is_developer }) => {
    let additional_query = null;
    if (!is_developer)
        additional_query = { access_id: { "$ne": process.env.DEVELOPER_ACCESS_ID } };
    const query = await filter_query(args.filter, additional_query);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const users = await UserModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: users.totalDocs,
            page: users.page,
            pages: users.totalPages,
            limit: users.limit,
        },
        data: users.docs
    };
};
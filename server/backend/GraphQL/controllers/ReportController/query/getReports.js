const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { ReportModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const reports = await ReportModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: reports.totalDocs,
            page: reports.page,
            pages: reports.totalPages,
            limit: reports.limit,
        },
        data: reports.docs
    };
};
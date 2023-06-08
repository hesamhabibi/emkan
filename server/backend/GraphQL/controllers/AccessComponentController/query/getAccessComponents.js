const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { AccessComponentModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "sort", type: 1 });
    const accessComponents = await AccessComponentModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: accessComponents.totalDocs,
            page: accessComponents.page,
            pages: accessComponents.totalPages,
            limit: accessComponents.limit,
        },
        data: accessComponents.docs
    };
};
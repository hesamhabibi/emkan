const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { FormModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const forms = await FormModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: forms.totalDocs,
            page: forms.page,
            pages: forms.totalPages,
            limit: forms.limit,
        },
        data: forms.docs
    };
};
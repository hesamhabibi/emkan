const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { AttributeModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const attributes = await AttributeModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: attributes.totalDocs,
            page: attributes.page,
            pages: attributes.totalPages,
            limit: attributes.limit,
        },
        data: attributes.docs
    };
};
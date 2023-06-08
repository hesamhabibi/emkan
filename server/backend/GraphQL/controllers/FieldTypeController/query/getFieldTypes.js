const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { FieldTypeModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const field_types = await FieldTypeModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: field_types.totalDocs,
            page: field_types.page,
            pages: field_types.totalPages,
            limit: field_types.limit,
        },
        data: field_types.docs
    };
};
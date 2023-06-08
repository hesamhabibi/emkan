const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { FieldValidationModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const field_validations = await FieldValidationModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: field_validations.totalDocs,
            page: field_validations.page,
            pages: field_validations.totalPages,
            limit: field_validations.limit,
        },
        data: field_validations.docs
    };
};
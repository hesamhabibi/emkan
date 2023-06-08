const { sort_query } = require('@common/helpers/SortHelper');
const { collect } = require('collect.js');

module.exports = async (parent, args, { models: { FormValueModel, CategoryModel }, helpers: { FilterHelper: { filter_query } }, AuthUser }) => {
    let form_ids;
    try {
        const categories = await CategoryModel.find({ access_user_ids: AuthUser.id }).lean();
        form_ids = collect(categories).pluck('form_id').all();
    } catch (e) {
        console.log(e);
        form_ids = [];
    }
    const query = await filter_query(args.filter, { form_id: { "$in": form_ids } });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const form_values = await FormValueModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: form_values.totalDocs,
            page: form_values.page,
            pages: form_values.totalPages,
            limit: form_values.limit,
        },
        data: form_values.docs
    };
};
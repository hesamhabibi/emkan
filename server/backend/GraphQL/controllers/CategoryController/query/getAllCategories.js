const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { CategoryModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "sort", type: -1 });
    const categories = await CategoryModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return categories;
};
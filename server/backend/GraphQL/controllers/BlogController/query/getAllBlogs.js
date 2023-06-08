const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { BlogModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort);
    const blogs = await BlogModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return blogs;
};
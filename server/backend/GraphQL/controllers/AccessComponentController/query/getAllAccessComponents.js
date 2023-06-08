const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { AccessComponentModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "sort", type: 1 });
    const accessComponents = await AccessComponentModel.find(query).sort(sort).lean({ virtuals: true, defaults: true });
    return accessComponents;
};
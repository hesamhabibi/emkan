const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { CRMModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const crms = await CRMModel.find(query).sort(sort).lean({ virtuals: true, defaults: true });
    return crms;
};
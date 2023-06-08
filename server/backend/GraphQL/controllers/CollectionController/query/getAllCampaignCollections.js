const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { CollectionModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter, { source: CollectionModel.sources.campaign });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const collections = await CollectionModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return collections;
};
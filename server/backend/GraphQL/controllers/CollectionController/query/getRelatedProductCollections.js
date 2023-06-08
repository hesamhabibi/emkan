const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { CollectionModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter, { source: CollectionModel.sources.related_product });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const collections = await CollectionModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: collections.totalDocs,
            page: collections.page,
            pages: collections.totalPages,
            limit: collections.limit,
        },
        data: collections.docs
    };
};
module.exports = async (parent, args, { models: { CollectionModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const collections = await CollectionModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10) });
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
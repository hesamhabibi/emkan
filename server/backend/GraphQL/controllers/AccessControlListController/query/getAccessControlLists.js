module.exports = async (parent, args, { models: { AccessControlListModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const accessControlLists = await AccessControlListModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10) });
    return {
        paginate: {
            total: accessControlLists.totalDocs,
            page: accessControlLists.page,
            pages: accessControlLists.totalPages,
            limit: accessControlLists.limit,
        },
        data: accessControlLists.docs
    };
};
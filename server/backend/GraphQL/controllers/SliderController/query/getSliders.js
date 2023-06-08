const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { SliderModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const sliders = await SliderModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: sliders.totalDocs,
            page: sliders.page,
            pages: sliders.totalPages,
            limit: sliders.limit,
        },
        data: sliders.docs
    };
};
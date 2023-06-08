const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { SliderModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const slider = await SliderModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return slider;
};
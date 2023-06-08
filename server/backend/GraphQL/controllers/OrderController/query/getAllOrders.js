const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { OrderModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter, { type: OrderModel.types.complete });
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const orders = await OrderModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    return orders;
};
const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { UserModel }, helpers: { FilterHelper: { filter_query } }, is_developer }) => {
    let additional_query = null;
    if (!is_developer)
        additional_query = { access_id: { "$ne": process.env.DEVELOPER_ACCESS_ID } };
    const query = await filter_query(args.filter, additional_query);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const users = await UserModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);
    // const users = await UserModel.find(query);
    return users;
};
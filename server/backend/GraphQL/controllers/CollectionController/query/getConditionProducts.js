const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

const { get_products } = require("@helpers/CollectionHelper");
const { sort_query } = require('@common/helpers/SortHelper');


module.exports = async (parent, args, { models: { CollectionModel }, helpers: { ValidationHelper, FilterHelper: { filter_query } }, error_res, trans }) => {

    // get input
    const condition = collect(args.condition).only(['model_name', 'limit', 'logic', 'orders', 'wheres']).all();
    try { condition.orders = collect(condition.orders).map((item) => { return collect(item).only(['type', 'field']).all(); }).all(); } catch { /* empty */ }
    try { condition.wheres = collect(condition.wheres).map((item) => { return collect(item).only(['operator', 'where_field', 'where_value']).all(); }).all(); } catch { /* empty */ }

    // validate input :
    const rules = {
        model_name: 'string',
        limit: 'integer',
        logic: ['required', { in: Object.values(CollectionModel.logics) }],
        'orders.*': {
            type: ['required', `in:${Object.values(CollectionModel.orders_types)}`],
            field: ['required', 'string'],
        },
        'wheres.*': {
            operator: ['required', `in:${Object.values(CollectionModel.wheres_operators)}`],
            where_field: ['required', 'string'],
            // 'where_value': "JSON", // todo: escape value for mongo query
        }
    };

    const validation = new Validatorjs(condition, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const mix_variant_products = await get_products(condition, query, sort);
    return mix_variant_products;
};
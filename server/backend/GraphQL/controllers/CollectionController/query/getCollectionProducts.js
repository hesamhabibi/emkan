const { sort_query } = require('@common/helpers/SortHelper');
const { get_product_by_collection_id } = require('@helpers/CollectionHelper');

module.exports = async (parent, args, { helpers: { FilterHelper: { filter_query } }, error_res, trans }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const mix_variant_products = await get_product_by_collection_id(args.id, query, sort);
    if (mix_variant_products == null)
        error_res(trans('not_found', { attr: "collection" }));

    return mix_variant_products;
};
const { collect } = require('collect.js');
const { get_setting } = require('@helpers/SettingHelper');
const { sort_query } = require('@common/helpers/SortHelper');

module.exports = async (parent, args, { models: { ProductModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const input = collect(args.selection).only(['category_ids', 'brand_ids', 'product_code', 'title']).all();

    // if ( // if no filter applied then return empty list
    //     !(Array.isArray(input.category_ids) && input.category_ids.length > 0) && // category_ids
    //     !(Array.isArray(input.brand_ids) && input.brand_ids.length > 0) && // brand_ids
    //     !(typeof input.title == 'string' && input.title != '') && // title
    //     !(typeof input.product_code == 'string' && input.product_code != '')
    // )
    //     return [];

    const queries = [];
    // category_ids query
    if (Array.isArray(input.category_ids) && input.category_ids.length > 0) {
        queries.push({
            category_ids: { "$in": input.category_ids }
        });
    }
    // brand_ids query
    if (Array.isArray(input.brand_ids) && input.brand_ids.length > 0) {
        queries.push({
            brand_id: { "$in": input.brand_id }
        });
    }

    // title query
    if (typeof input.title == 'string' && input.title != '') {
        // get valid langs:
        let all_locals = ["fa", "en"];
        try {
            const setting = await get_setting('web_content_languages');
            all_locals = setting.value.map(lang => lang.code);
        } catch (e) {
            console.log('error in get settings:', e);
            all_locals = ['en', 'fa'];
        }
        all_locals.map(local => {
            queries.push({ title: { [local]: { "$regex": input.title } } });
        });
    }

    const query = await filter_query(args.filter, queries.length > 0 ? { "$or": queries } : null);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    let products = await ProductModel.find(query).lean({ virtuals: true, defaults: true }).sort(sort);

    if (typeof input.product_code == 'string' && input.product_code != '') {
        products = products.map((product) => {
            return product.mix_variant.filter((mix_variant) => {
                return RegExp(input.code).test(mix_variant.details.code);
            });
        }).filter((product) => {
            return product.mix_variant.length > 0;
        });
    }

    return products;
};
const {
    helper_connect_database,
    helper_lastmod_aggregate,
    helper_data_aggregate,
    helper_sitemap_list,
    helper_sitemap_index,
} = require('./sitemap_helpers');

const sitemap = async (req, res) => {

    await helper_connect_database();
    require('@models/SEOModel'); // must be loaded

    const { BlogModel } = require('@models/BlogModel');
    const { ProductModel } = require('@models/ProductModel');
    const { CategoryModel } = require('@models/CategoryModel');

    const data = [
        {
            group: "blogs",
            url_prefix: 'blog',
            model: BlogModel,
            lastmod_aggregate: helper_lastmod_aggregate(BlogModel.types.blog),
            data_aggregate: helper_data_aggregate({
                type: BlogModel.types.blog,
                publishAt: {
                    $lt: new Date(),
                },
                status: BlogModel.statuses.show,
            }),
        },
        {
            group: "products",
            url_prefix: 'product',
            model: ProductModel,
            lastmod_aggregate: helper_lastmod_aggregate(ProductModel.types.product),
            data_aggregate: helper_data_aggregate({
                type: ProductModel.types.product,
                publishAt: {
                    $lt: new Date(),
                },
                status: ProductModel.statuses.show,
            }),
        },
        {
            group: "blog_categories",
            url_prefix: 'blogs',
            model: CategoryModel,
            lastmod_aggregate: helper_lastmod_aggregate(CategoryModel.types.blog),
            data_aggregate: helper_data_aggregate({
                type: CategoryModel.types.blog,
                active: true,
            }),
            url_generator: (url_prefix, row) => {
                return `${url_prefix}?category=${encodeURIComponent(row?.seo.url)}`;
            }
        },
        {
            group: "product_categories",
            url_prefix: 'products',
            model: CategoryModel,
            lastmod_aggregate: helper_lastmod_aggregate(CategoryModel.types.product),
            data_aggregate: helper_data_aggregate({
                type: CategoryModel.types.product,
                active: true,
            }),
            url_generator: (url_prefix, row) => {
                return `${url_prefix}?category=${encodeURIComponent(row?.seo.url)}`;
            }
        },
    ];

    let group_data;
    if (req.query?.group) {
        group_data = data.find(item => {
            return item.group == req.query.group;
        })
    }
    if (group_data) {
        return res.end(await helper_sitemap_list(group_data));
    } else {
        return res.end(await helper_sitemap_index(data));
    }
}

module.exports = {
    sitemap,
}
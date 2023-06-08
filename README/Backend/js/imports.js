const import_files = [
    'data/not_found_page_data.js',
    'data/table_page_data.js',
    'data/common_data.js',
    'data/blog_page_data.js',
    'data/author_page_data.js',
    'data/category_page_data.js',
    'data/media_page_data.js',
    'data/paginate_page_data.js',
    'data/comment_page_data.js',
    'data/slider_page_data.js',
    'data/tag_page_data.js',
    'data/seo_page_data.js',
    'data/product_page_data.js',
    'data/price_page_data.js',
    'data/setting_page_data.js',
    'data/user_page_data.js',
    'data/address_page_data.js',
    'data/crm_page_data.js',
    'data/order_page_data.js',

    'data.js',
    'render_elements.js',
    'render_page.js',
];

for (i in import_files) {
    // import data:
    const data_script = document.createElement('script');
    data_script.setAttribute('src', `js/${import_files[i]}?v=${version}`);
    document.head.appendChild(data_script);
}
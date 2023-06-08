function render() {
    data = generate_data();

    const params = new URLSearchParams(window.location.search);
    const page_name = params.get("page") || '';

    let page = data.TablePage;

    switch (page_name.toLowerCase()) {
        case 'blog':
        case 'blogmodel':
        case 'blog-model':
        case 'blogpage':
        case 'blog-page':
            page = data.BlogPage;
            break;

        case 'author':
        case 'authormodel':
        case 'author-model':
        case 'authorpage':
        case 'author-page':
            page = data.AuthorPage;
            break;

        case 'category':
        case 'categorymodel':
        case 'category-model':
        case 'categorypage':
        case 'category-page':
            page = data.CategoryPage;
            break;

        case 'media':
        case 'mediamodel':
        case 'media-model':
        case 'mediapage':
        case 'media-page':
            page = data.MediaPage;
            break;

        case 'paginate':
        case 'paginateutil':
        case 'paginate-util':
        case 'paginatepage':
        case 'paginate-page':
            page = data.PaginatePage;
            break;

        case 'comment':
        case 'commentmodel':
        case 'comment-model':
        case 'commentpage':
        case 'comment-page':
            page = data.CommentPage;
            break;

        case 'slider':
        case 'slidermodel':
        case 'slider-model':
        case 'sliderpage':
        case 'slider-page':
            page = data.SliderPage;
            break;

        case 'tag':
        case 'tagmodel':
        case 'tag-model':
        case 'tagpage':
        case 'tag-page':
            page = data.TagPage;
            break;

        case 'seo':
        case 'seomodel':
        case 'seo-model':
        case 'seopage':
        case 'seo-page':
            page = data.SEOPage;
            break;

        case 'product':
        case 'productmodel':
        case 'product-model':
        case 'productpage':
        case 'product-page':
            page = data.ProductPage;
            break;

        case 'price':
        case 'pricemodel':
        case 'price-model':
        case 'pricepage':
        case 'price-page':
            page = data.PricePage;
            break;

        case 'setting':
        case 'settingmodel':
        case 'setting-model':
        case 'settingpage':
        case 'setting-page':
            page = data.SettingPage;
            break;

        case 'user':
        case 'usermodel':
        case 'user-model':
        case 'userpage':
        case 'user-page':
            page = data.UserPage;
            break;

        case 'address':
        case 'addressmodel':
        case 'address-model':
        case 'addresspage':
        case 'address-page':
            page = data.AddressPage;
            break;

        case 'crm':
        case 'crmmodel':
        case 'crm-model':
        case 'crmpage':
        case 'crm-page':
            page = data.CRMPage;
            break;

        case 'order':
        case 'ordermodel':
        case 'order-model':
        case 'orderpage':
        case 'order-page':
            page = data.OrderPage;
            break;

        case '':
        case 'table':
        case 'main':
        case 'home':
        case 'index':
            page = data.TablePage;
            break;
        default:
            page = data.NotFoundPage;
            break;
    }

    let pageHeader = createPageHeader(page.pageHeaderTitle, page.pageHeaderIcon, page.pageHeaderProperties, page.hasReturnLink);
    let pageContent = createPageContent(object_to_html(page.pageContent, data.syncContents));

    document.title = page.pageTitle;
    document.getElementById('page-body').innerHTML = pageHeader + pageContent;
}
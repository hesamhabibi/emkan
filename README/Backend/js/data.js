const generate_data = () => {
    const replaceStrings = [
        {
            pattern: /\$-/g,
            replace_with: '<strong>',
        }, {
            pattern: /-\$/g,
            replace_with: '</strong>',
        },
        {
            pattern: /\$RTL/g,
            replace_with: '<div class="rtl">',
        },
        {
            pattern: /RTL\$/g,
            replace_with: '</div>',
        },
        {
            pattern: /\$F\$/g,
            replace_with: '🌱',
        },
        {
            pattern: /\$V\$/g,
            replace_with: '🐲',
        },
        {
            pattern: /\$EO\$/g,
            replace_with: '🐣',
        },
        {
            pattern: /\$A\$/g,
            replace_with: '🐛',
        }
    ]

    return {
        replaceStrings: replaceStrings,

        NotFoundPage,
        TablePage,

        BlogPage,
        BlogPageContent,

        AuthorPage,
        AuthorPageContent,

        CategoryPage,
        CategoryPageContent,

        MediaPage,
        MediaPageContent,

        PaginatePage,
        PaginatePageContent,

        CommentPage,
        CommentPageContent,

        SliderPage,
        SliderPageContent,

        TagPage,
        TagPageContent,

        SEOPage,
        SEOPageContent,
        
        ProductPage,
        ProductPageContent,

        PricePage,
        PricePageContent,

        SettingPage,
        SettingPageContent,

        UserPage,
        UserPageContent,

        AddressPage,
        AddressPageContent,

        CRMPage,
        CRMPageContent,

        OrderPage,
        OrderPageContent,

        footnote: common_footnote,
    }
}
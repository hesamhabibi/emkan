const SEOPage = {
    pageTitle: "SEO",
    pageHeaderIcon: '📂',
    pageHeaderTitle: 'SEO',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'SEOPageContent',
        }
    ]
}

const SEOPageContent = [
    { // private fields
        type: 'tg',
        title: '$-Private Fields:-$',
        open: true,
        id: 'private-fields-section',
        inner: [
            { // url_status
                type: 'tg',
                title: '$F$ url_status',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate url generated automatically or it is custom url', },
                            { type: 'p', inner: 'مشخص می کند که لینک سئو به صورت خودکار ساخته شده یا به صورت دستی وارد شده.', },
                        ]
                    },
                ]
            },
        ]
    },
    { // public fields
        type: 'tg',
        title: '$-Public Fields:-$',
        open: true,
        id: 'public-fields-section',
        inner: [
            { // title
                type: 'tg',
                title: '$F$ title',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'title of seo', },
                            { type: 'p', inner: 'عنوان سئو', },
                        ]
                    },
                ]
            },
            { // description
                type: 'tg',
                title: '$F$ description',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'description of seo' },
                            { type: 'p', inner: 'توضیحات سئو' },
                        ],
                    },
                ]
            },
            { // keywords
                type: 'tg',
                title: '$F$ keywords',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'keywords of seo' },
                            { type: 'p', inner: 'کلمات کلیدی سئو' },
                        ],
                    },
                ]
            },
            { // url
                type: 'tg',
                title: '$F$ url',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'slug or url of seo' },
                            { type: 'p', inner: 'لینک سئو' },
                        ],
                    },
                ]
            },
            { // canonical_url
                type: 'tg',
                title: '$F$ canonical_url',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'canonical_url of seo',
                    },
                ]
            },
            { // redirect_url_301
                type: 'tg',
                title: '$F$ redirect_url_301',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'redirect_url_301 of seo',
                    },
                ]
            },
            { // redirect_url_404
                type: 'tg',
                title: '$F$ redirect_url_404',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'redirect_url_404 of seo',
                    },
                ]
            },
            { // robots_status
                type: 'tg',
                title: '$F$ robots_status',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'robots_status of seo' },
                            { type: 'p', inner: 'نوع واکنش نشان دادن ربات ها با صفحه سئو' },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'can be: "index_follow", "noindex_follow", "index_nofollow" or "noindex_nofollow"' },
                            { type: 'p', inner: 'می تواند مقادیر: "index_follow", "noindex_follow", "index_nofollow" یا "noindex_nofollow" داشته باشد.' },
                        ],
                    },
                ]
            },
            { // createdAt
                type: 'tg',
                title: '$F$ createdAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'Date and time that seo created', },
                            { type: 'p', inner: 'زمان ساخته شدن سئو', },
                        ],
                    },
                ]
            },
            { // updateAt
                type: 'tg',
                title: '$F$ updatedAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'Date and time that seo updated', },
                            { type: 'p', inner: 'زمان آخرین ویرایش سئو', },
                        ],
                    },
                ]
            },
        ]
    },
    { // footnote
        type: 'ref',
        ref: 'footnote',
    }
];
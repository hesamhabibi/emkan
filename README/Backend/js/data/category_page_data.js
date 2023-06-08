const CategoryPage = {
    pageTitle: "Category",
    pageHeaderIcon: '🔗',
    pageHeaderTitle: 'Category',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'CategoryPageContent',
        }
    ]
}

const CategoryPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: 'always filter query by "active" fields to get only active categories',
            },
            {
                type: 'bl',
                inner: 'همیشه کوئری را بر اساس فیلد "active" فیلتر کنید. و فقط دسته بندی هایی را نمایش دهید که "active" هستند.',
            },
        ]
    },
    { // private fields
        type: 'tg',
        title: '$-Private Fields:-$',
        open: true,
        id: 'private-fields-section',
        inner: [
            { // active
                type: 'tg',
                title: '$F$ active',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate category is active or not', },
                            { type: 'p', inner: 'مشخص می کند که دسته بندی فعال است یا نه.', },
                        ]
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'always filter categories with active field', },
                            { type: 'p', inner: 'همیشه کوئری دسته بندی را بر اساس فیلد "active" فیلتر کنید.', },
                        ],
                    },
                ]
            },
            { // type
                type: 'tg',
                title: '$F$ type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'blog': 1,'page': 2,'product': 3,'catalogue': 4}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'type of category can be "blog", "page", "product" or "catalogue"' },
                            { type: 'p', inner: 'نوع دسته بندی، می تواند "blog"، "page"، "product" و یا "catalogue" باشد.' },
                        ],
                    },
                ]
            },
            { // user_id
                type: 'tg',
                title: '$F$ user_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of user that created this category' },
                            { type: 'p', inner: 'آیدی کاربر سازنده این دسته بندی', },
                        ],
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
                            { type: 'p', inner: 'title of category', },
                            { type: 'p', inner: 'عنوان دسته بندی', },
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
                            { type: 'p', inner: 'description or content of category' },
                            { type: 'p', inner: 'متن اصلی دسته بندی' },
                        ],
                    },
                ]
            },
            { // show_in_menu
                type: 'tg',
                title: '$F$ show_in_menu',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate this category should be displayed in the filter menu' },
                            { type: 'p', inner: 'مشخص می کند که این دسته بندی باید در منو فیلتر نمایش داده شود' },
                        ],
                    },
                ]
            },
            { // parent_id
                type: 'tg',
                title: '$F$ parent_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of parent category', },
                            { type: 'p', inner: 'آیدی دسته بندی والد.', },
                        ]
                    },
                ]
            },
            { // parent
                type: 'tg',
                title: '$V$ parent',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'parent of this category', },
                            { type: 'p', inner: 'اطلاعات دسته بندی والد.', },
                        ]
                    },
                    {
                        type: 'a',
                        link: 'CategoryPage',
                        inner: 'Category Model',
                    }
                ]
            },
            { // children
                type: 'tg',
                title: '$A$$V$ children',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'children of this category' },
                            { type: 'p', inner: 'اطلاعات دسته بندی های فرزند.' },
                        ],
                    },
                    {
                        type: 'a',
                        link: 'CategoryPage',
                        inner: 'Category Model',
                    }
                ]
            },
            { // media
                type: 'tg',
                title: '$F$$EO$ media',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'media(image or icon) of category', },
                            { type: 'p', inner: 'تصویر یا آیکون دسته بندی', },
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$F$ media_id',
                        inner: [
                            {
                                type: 'bl',
                                inner: "ObjectId",
                            },
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$V$ media',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Virtual(Relation)",
                            },
                            {
                                type: 'bl',
                                inner: 'virtual relation to media',
                            },
                            {
                                type: 'bl',
                                inner: {
                                    type: 'a',
                                    link: 'MediaPage',
                                    inner: 'Media Model',
                                }
                            }
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$F$ alt',
                        inner: [
                            {
                                type: 'bl',
                                inner: "multi language",
                            },
                            {
                                type: 'bl',
                                inner: 'alt of media',
                            },
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$F$ url',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: 'link or url of media',
                            },
                        ]
                    },
                ]
            },
            { // seo_id
                type: 'tg',
                title: '$F$ seo_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of seo that attached to this category' },
                            { type: 'p', inner: 'آیدی مدل سئوی که به این دسته یندی وصل شده.' },
                        ],
                    },
                ]
            },
            { // seo
                type: 'tg',
                title: '$V$ seo',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'seo that attached to this category', },
                            { type: 'p', inner: 'اطلاعات سئو وصل شده به این دسته بندی. اطلاعاتی مثل عنوان صفحه، لینک(slug) و ... در این مدل ذخیره می شود.', },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'SEOPage',
                            inner: 'SEO Model',
                        },
                    }
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
                            { type: 'p', inner: 'Date and time that category created', },
                            { type: 'p', inner: 'زمان ساخته شدن دسته بندی', },
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
                            { type: 'p', inner: 'Date and time that category updated', },
                            { type: 'p', inner: 'زمان آخرین ویرایش دسته بندی', },
                        ],
                    },
                ]
            },
            { // sort
                type: 'tg',
                title: '$F$ sort',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'sort by this fields if no field specified for sorting', },
                            { type: 'p', inner: 'در صورت مشخص نکردن فیلد برای مرتب سازی از این فیلد استفاده شود.', },
                        ],
                    },
                ]
            },
        ]
    },
    { // filter fields
        type: 'tg',
        title: '$-Filter Fields:-$',
        open: true,
        id: 'filter-fields-section',
        inner: [
            { // type
                type: 'tg',
                title: '$F$ type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'filter categories by "type" field', },
                            { type: 'p', inner: 'دسته بندی ها را طبق فیلد "type" فیلتر می کند.', },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'type of category can be "blog", "page", "product" or "catalogue"' },
                            { type: 'p', inner: 'نوع دسته بندی، می تواند "blog"، "page"، "product" و یا "catalogue" باشد.' },
                        ],
                    },
                ]
            },
            { // show_in_menu
                type: 'tg',
                title: '$F$ show_in_menu',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'filter categories by "show_in_menu" field', },
                            { type: 'p', inner: 'دسته بندی ها را طبق فیلد "show_in_menu" فیلتر می کند.', },
                        ],
                    },
                ]
            },
            { // parent_id
                type: 'tg',
                title: '$F$ parent_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'filter categories by "parent_id" field', },
                            { type: 'p', inner: 'دسته بندی ها را طبق فیلد "parent_id" فیلتر می کند.', },
                        ],
                    },
                ]
            },
        ]
    },
    { // sort fields
        type: 'tg',
        title: '$-Sort Fields:-$',
        open: true,
        id: 'sort-fields-section',
        inner: [
            { type: 'bl', inner: '$F$ sort' },
            { type: 'bl', inner: '$F$ createdAt' },
            { type: 'bl', inner: '$F$ updatedAt' },
        ]
    },
    { // footnote
        type: 'ref',
        ref: 'footnote',
    }
];
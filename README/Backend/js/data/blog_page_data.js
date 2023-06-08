const BlogPage = {
    pageTitle: "Blog",
    pageHeaderIcon: '📜',
    pageHeaderTitle: 'Blog',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'BlogPageContent',
        }
    ]
}

const BlogPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    { type: 'p', inner: 'always filter query by "$-type-$" field to get blog that you want' },
                    { type: 'p', innner: 'همیشه کوئری را بر اساس فیلد "type" فیلتر کنید تا بلاگ مورد نظر خود را بدست آورید.' },
                ],
            },
            {
                type: 'bl',
                inner: [
                    { type: 'p', inner: 'just show blogs that has "$-show-$" "$-status-$" and $-past-$ "$-publishAt-$"' },
                    { type: 'p', inner: 'فقط بلاگ هایی که "status" آنها مقدار "show" دارد و "publicAt" آنها گذشته است را نشان دهید.' },
                ],
            },
        ]
    },
    { // private fields
        type: 'tg',
        title: '$-Private Fields:-$',
        open: true,
        id: 'private-fields-section',
        inner: [
            { // type
                type: 'tg',
                title: '$F$ type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'blog': 1,'page': 2,'catalogue': 3,'project': 4}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'type of blog can be "blog", "page", "catalogue" or "project".' },
                            { type: 'p', inner: 'نوع بلاگ، می تواند "blog"، "page"، "catalogue" و یا "project" باشد.' },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: "always filter query by type to get just blogs that you want",
                    },
                ]
            },
            { // status
                type: 'tg',
                title: '$F$ status',
                inner: [
                    {
                        type: 'bl',
                        inner: "type: enum: {'inactive': 1,'show': 2,'draft': 3}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'just show blog if its status is "show".' },
                            { type: 'p', inner: 'فقط بلاگ های نمایش داده شوند که مقدار "status" آنها "show" باشد.' }
                        ],
                    },
                ]
            },
            { // publishAt
                type: 'tg',
                title: '$F$ publishAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'just show blog if its publishAt is past.' },
                            { type: 'p', inner: 'فقط بلاگ هایی نمایش داده شوند که مقدار "publishAt" آنها گذشته باشد.' }
                        ],
                    },
                ]
            },
            // todo: add has_rating
            // todo: add has_comment
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
                            { type: 'p', inner: 'title of "blog", "page", "catalogue", "project"' },
                            { type: 'p', inner: 'عنوان بلاگ، صفحه، کاتالوگ و یا پروژه' },
                        ],
                    },
                ]
            },
            { // summary
                type: 'tg',
                title: '$F$ summary',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'summary of "blog", "page", "catalogue", "project"' },
                            { type: 'p', inner: 'متن خلاصه بلاگ، صفحه، کاتالوگ و یا پروژه' }
                        ],
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
                            { type: 'p', inner: 'description or content of "blog", "page", "catalogue", "project"' },
                            { type: 'p', inner: 'متن اصلی بلاگ، صفحه، کاتالوگ و یا پروژه' }
                        ],
                    },
                ]
            },
            { // category_id
                type: 'tg',
                title: '$F$ category_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of category attached to this blog', },
                            { type: 'p', inner: 'آیدی دسته بندی که بلاگ در آن قرار دارد.', },
                        ],
                    },
                ]
            },
            { // category
                type: 'tg',
                title: '$V$ category',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'category that attached to this blog', },
                            { type: 'p', inner: 'اطلاعات دسته بندی که بلاگ در آن قرار دارد.' },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'CategoryModel',
                            inner: 'Category Model',
                        },
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
                            { type: 'p', inner: 'main media of "media_gallery"', },
                            { type: 'p', inner: 'تصویر اصلی بلاگ. این تصویریکی از تصاویر "image_gallery" است که به عنوان تصویر اصلی انتخاب شده است.' },
                        ],
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
            {// media_gallery
                type: 'tg',
                title: '$F$$A$$EO$ media_gallery',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of embedded object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'list of images', },
                            { type: 'p', inner: 'گالری تصاویر بلاگ', },
                        ],
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
                        title: '$F$ sort',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: 'images must be sorted by this number',
                            },
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$F$ is_main',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Boolean",
                            },
                            {
                                type: 'bl',
                                inner: 'indicate main media of gallery,just one of images is main',
                            },
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
            { // document
                type: 'tg',
                title: '$F$$EO$ document',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'document file attached to this blog, file extension can be PDF, zip, docx ...', },
                            { type: 'p', inner: 'فایل ضمینه مربوط به کاتالوگ. فرمت فایل میتواند PDF، zip، docx، ... باشد. این فایل برای دانلود است نه نمایش.' },
                        ],
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
                            { type: 'p', inner: 'id of seo that attached to this blog', },
                            { type: 'p', inner: 'آیدی مدل سئوی که به این بلاگ وصل شده.' },
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
                            { type: 'p', inner: 'seo that attached to this blog', },
                            { type: 'p', inner: 'اطلاعات سئو وصل شده به این بلاگ. اطلاعاتی مثل عنوان صفحه، لینک(slug) و ... در این مدل ذخیره می شود.', },
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
            { // tag_ids
                type: 'tg',
                title: '$F$$A$ tag_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'list of tag_id that directly attached to this blog. To get a complete list of tags, this list must be merged with the list obtained from "tag_group_id". ',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: 'لیست تگ هایی که به صورت مستقیم به این بلاگ وصل شده اند. برای گرفتن لیست کامل تگ ها باید این لیست با لیست بدست آمده از "tag_group_id" ادغام شود.',
                    },
                ]
            },
            { // tag_group_id
                type: 'tg',
                title: '$F$ tag_group_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'id of tag group that attached to this blog',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی گروه تگی که به این بلاگ وصل شده.',
                    },
                ]
            },
            { // tags
                type: 'tg',
                title: '$A$$V$ tags',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Array Relation)",
                    },
                    {
                        type: 'bl',
                        inner: 'list tags that attached to this blog throw tag_ids field and tag_group_id fields',
                    },
                    {
                        type: 'bl',
                        inner: 'لیست همه تگ های متصل به این بلاگ. برای بدست آوردن این لیست باید مجموع تگ هایی که به صورت مستقیم به این بلاگ وصل شده و تگ هایی که از طریق گروه تگ وصل شده گرفته بشه.',
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'TagPage',
                            inner: 'Tag & TagGroup Model',
                        },
                    }
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
                        inner: 'id of user(author) that created this blog',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کاربر نویسنده این بلاگ',
                    },
                ]
            },
            { // user
                type: 'tg',
                title: '$V$ user',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: 'user information of user that created this blog',
                    },
                    {
                        type: 'bl',
                        inner: 'اطلاعات کاربر نویسنده این بلاگ',
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'AuthorPage',
                            inner: 'Author',
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
                        inner: 'Date and time that blog created',
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
                        inner: 'Date and time that blog updated',
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
            { type: 'bl', inner: '$F$ createdAt' },
            { type: 'bl', inner: '$F$ updatedAt' },
        ]
    },
    { // filter fields
        type: 'tg',
        title: '$-Filter Fields:-$',
        open: true,
        id: 'filter-fields-section',
        inner: [
            { // search text
                type: 'tg',
                title: 'search_text',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'search in title, summary and description field',
                    },
                    {
                        type: 'bl',
                        inner: 'جهت جست و جو در عنوان، خلاصه و محتوا',
                    },
                ]
            },
            { // category_ids
                type: 'tg',
                title: '$A$ category_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'filter blogs by category ids',
                    },
                    {
                        type: 'bl',
                        inner: 'returns blogs that attached to one of those category ids',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس دسته بندی های متصل به بلاگ ها',
                    },
                    {
                        type: 'bl',
                        inner: 'در صورتی که چند دسته بندی انتخاب شده بود، بلاگ هایی نمایش داده شود که به یکی از این دسته بندی ها متصل شده باشد.',
                    },
                ]
            },
            { // tag_ids
                type: 'tg',
                title: '$A$ tag_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'filter blogs by tag_ids and tag_group_ids fields',
                    },
                    {
                        type: 'bl',
                        inner: 'returns blogs that has one of the tag_ids or has tag_group_id that has one of tag_ids',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس تگ های متصل به بلاگ ها',
                    },
                    {
                        type: 'bl',
                        inner: 'دقت داشته باشید که تگ ها غیر از اینکه به صورت مستقیم به بلاگ متصل می شوند، می توانند از طریق گروه تگ هم متصل شوند.',
                    },
                    {
                        type: 'bl',
                        inner: 'در صورتی که چند تگ انتخاب شده بود، بلاگ هایی نمایش داده شود که به یکی از این تگ ها متصل شده باشد.',
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
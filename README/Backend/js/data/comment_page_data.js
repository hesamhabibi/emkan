const CommentPage = {
    pageTitle: "Comment",
    pageHeaderIcon: '📝',
    pageHeaderTitle: 'Comment',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'CommentPageContent',
        }
    ]
}

const CommentPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    "filter comment's by confirmed field, and just show confirmed comment",
                    'فقط نظر های که تایید شده اند نمایش داده شوند.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    'to find related comment of one blog or product use all "model_id", "model_name" and "model_type" fields',
                    'برای پیدا کردن نظر های مربوط به یک بلاگ یا محصول از فیلد های "model_id", "model_name" و "model_type" استفاده کنید.',
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
            { // confirmed
                type: 'tg',
                title: '$F$ confirmed',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'title of comment',
                            'عنوان نظر'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: "always filter query by type to get just blogs that you want",
                    },
                ]
            },
            { // model_id
                type: 'tg',
                title: '$F$ model_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'morph model id of relation',
                            'آدی مدل برای رابطه morph'
                        ],
                    },
                ]
            },
            { // model_name
                type: 'tg',
                title: '$F$ model_name',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'morph model name of relation',
                            'نام مدل برای رابطه morph'
                        ],
                    },
                ]
            },
            { // model_type
                type: 'tg',
                title: '$F$ model_type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'morph type of model of relation',
                            'نوع مدل برای رابطه morph, این فیلد برای متمایز شدن بلاگ و کاتالوگ و page و ... که مدل یکسان دارند کاربردی است..'
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
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'title of comment',
                            'عنوان نظر',
                        ],
                    },
                ]
            },
            { // text
                type: 'tg',
                title: '$F$ text',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'content of comment',
                            'محتوا نظر'
                        ],
                    },
                ]
            },
            { // reply_to_id
                type: 'tg',
                title: '$F$ reply_to_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'id comment that replied to',
                            'آدی نظری که در جواب آن این نظر نوشته شده است.'
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
                        inner: 'id of user(author) that created this comment',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کاربر نویسنده این نظر',
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
                        inner: 'user information of user that created this comment',
                    },
                    {
                        type: 'bl',
                        inner: 'اطلاعات کاربر نویسنده این نظر',
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
                        inner: 'Date and time that comment created',
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
                        inner: 'Date and time that comment updated',
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
            { // reply_to_id
                type: 'tg',
                title: 'reply_to_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'برای گرفتن نظر های پاسخ در یک نظر.',
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
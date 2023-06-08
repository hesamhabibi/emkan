const SliderPage = {
    pageTitle: "Slider",
    pageHeaderIcon: '🎚',
    pageHeaderTitle: 'Slider',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'SliderPageContent',
        }
    ]
}

const SliderPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    "just return slider's with \"show\" status.",
                    'فقط اسلایدر های که مقدار "status" آنها "show" است نمایش داده شوند.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    'never show "user_id" field.',
                    'فیلد "user_id" نمایش داده نشود.',
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
            { // status
                type: 'tg',
                title: '$F$ status',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'status of slider can be "hide" or "show".',
                            'وضعیت نمایش اسلایدر میتواند "hide" یا "show" باشد.'
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
                        inner: "ID",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'user that created this slider',
                            'آدی کابر سازنده این اسلادر'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'never show this fields',
                            'نمایش داده نشود.'
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
                        inner: "Multi Language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'title of slider',
                            'عنوان اسلایدر',
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
                        inner: "Multi Language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'content of slider',
                            'محتوا اسلایدر'
                        ],
                    },
                ]
            },
            { // key
                type: 'tg',
                title: '$F$ key',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'unique key of slider',
                            'کلید منحصر به فرد اسلایدر'
                        ],
                    },
                ]
            },
            {// images
                type: 'tg',
                title: '$F$$A$$EO$ images',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of embedded object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'list of images of slider',
                            'لیستی از تصاویر اسلایدر',
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
                    {
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
                                    { type: 'p', inner: 'title of slider' },
                                    { type: 'p', inner: 'عنوان اسلایدر. روی تصویر اسلایدر نمایش داده شود.' },
                                ],
                            },
                        ]
                    },
                    {
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
                                    { type: 'p', inner: 'description of slider' },
                                    { type: 'p', inner: 'محتوای اسلایدر. روی تصویر اسلایدر نمایش داده شود.' },
                                ],
                            },
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$F$ link',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: 'p', inner: 'link of slider' },
                                    { type: 'p', inner: 'لینک اسلایدر. بعد از کلیک روی اسلایدر به این لینک انتقال داده شود.' },
                                ],
                            },
                        ]
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
    { // footnote
        type: 'ref',
        ref: 'footnote',
    }
];
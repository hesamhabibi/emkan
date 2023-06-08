const SettingPage = {
    pageTitle: "Setting",
    pageHeaderIcon: '🔧',
    pageHeaderTitle: 'Setting',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'SettingPageContent',
        }
    ]
}

const SettingPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    'dont show user_id of setting',
                    'آیدی کاربر نباید نمایش داده شود.'
                ],
            },
            {
                type: 'bl',
                inner: [
                    'to get setting by key use "findByKey" static of SettingModel.',
                    'برای پیدا کردن تنظیم با کلید مشخص از تابع "findByKey" استفاده کنید.',
                    'e.g: const setting = await SettingModel.findByKey("logo_image");',
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
                            'id of user that created this setting',
                            'آیدی کاربر سازنده این تنظیم.'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'dont show user_id of setting',
                            'آیدی کاربر نباید نمایش داده شود.'
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
                            'unique key to find settings',
                            'کلید منحصر به فرد برای تنظیم.',
                        ],
                    },
                ]
            },
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
                            'title of "setting"',
                            'عنوان تنظیم',
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
                            'a brief description about setting',
                            'توضیحات کوتاهی در مورد تنظیم'
                        ],
                    },
                ]
            },
            { // format
                type: 'tg',
                title: '$F$ format',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {...} (see formats of SettingModel)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'indicates format of value stored in setting',
                            'فرمت ذخیره شدن مقدار در فیلد "value"را مشخص میکند.'
                        ],
                    },
                ]
            },
            { // value
                type: 'tg',
                title: '$F$ value',
                inner: [
                    {
                        type: 'bl',
                        inner: "Mixed Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'value of setting',
                            'مقدار تنظیم'
                        ],
                    },
                ]
            },
            { // parsed_value
                type: 'tg',
                title: '$V$ parsed_value',
                inner: [
                    {
                        type: 'bl',
                        inner: "Mixed Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'parsed value of setting',
                            'مقدار تغییر یافته تنظیم'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'It is best to use this value on the web',
                            'بهتر است از این مقدار در وب استفاده شود'
                        ],
                    },
                ]
            },
            { // is_main
                type: 'tg',
                title: '$F$ is_main',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'indicates this setting is from seed or created by user ',
                            'مشخص میکند که این تنظیم اصلی است یا توسط کاربر ساخته شده است.'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'user cannot delete main settings',
                            'کاربر اجازه حذف کردن تنظیمات اصلی را ندارد.'
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
                        inner: 'Date and time that setting created',
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
                        inner: 'Date and time that setting updated',
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
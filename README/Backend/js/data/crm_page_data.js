const CRMPage = {
    pageTitle: "CRM",
    pageHeaderIcon: '🤝',
    pageHeaderTitle: 'CRM',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'CRMPageContent',
        }
    ]
}

const CRMPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    'always filter query by "$-type-$" field to get crm that you want',
                    'همیشه کوئری را بر اساس فیلد "type" فیلتر کنید تا crm مورد نظر خود را بدست آورید.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    'just show CRMs that has past "date"',
                    'فقط crm هایی که فیلد "date" آنها گذشته است، نمایش دهید.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    'to get user messages filter query by "send_to" field.',
                    'برای پیدا کردن پیام های کاربر باید طبق فیلد send_to فیلتر کنید',
                ],
            }, // note date
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
                        inner: "Enum: {sms: 1,email: 2,push_notification: 3,popup: 4,internal_message: 5,external_message: 6}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type of crm',
                            'نوع crm',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type "sms": send "text message" to all users or mobile that stored in "send_to" field',
                            'نوع "sms": به همه کاربر ها یا شماره موبایل هایی که در فیلد "send_to" هستند پیامک ارسال می کند.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type "email": send "message" and "title" to all users or email that stored in "send_to" field',
                            'نوع "email": به همه کاربر ها یا ایمیل هایی که در فیلد "send_to" هستند ایمیل ارسال می کند.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type "push_notification": send push notification to all users that stored in "send_to" field',
                            'نوع "email": به همه کاربر های که در فیلد "send_to" هستند اعلان ارسال می کند.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type "popup": save popup for all users that stored in "send_to" field. when user see a popup its "seen" field will be decreased.',
                            'نوع "popup": برای کاربرانی که در فیلد "send_to" هستند popup ذخیره می شود. هر بار که کاربر آن popup را ببیند از فیلد "seen" کم میشود. تا جایی که عدد "seen" صفر شود.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type "internal_message": save message for all users that stored in "send_to" field. when user see this message its "seen" field will be set to 0.',
                            'نوع "internal_message": برای کاربرانی که در فیلد "send_to" هستند پیام فروشگاه ذخیره می شود. زمانی که کاربر آن پیام را ببیند فیلد "seen" صفر شود.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type "external_message": used for external social media like "whatsapp" and "telegram" and ... ',
                            'نوع "external_message": برای پیام رسان های دیگر مانند واتس اپ یا تلگرام یا ... استفاده می شود.',
                        ],
                    },
                ]
            },
            { // kind
                type: 'tg',
                title: '$F$ kind',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'this used for external messages',
                            'برای پیام رسان های دیگر استفاده می شود.',
                        ],
                    },
                ]
            },
            { // send_to
                type: 'tg',
                title: '$A$$EO$$F$ send_to',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'list of users to send this crm to.',
                            'لیست کاربران که این crm باید برای آن ها ارسال شود',
                        ],
                    },
                    { // receiver_user_id
                        type: 'tg',
                        title: '$F$ receiver_user_id',
                        inner: [
                            {
                                type: 'bl',
                                inner: "ObjectId",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "id of receiver user" },
                                    { type: "p", inner: "آیدی کاربر دریافت کننده این crm" },
                                ],
                            },
                        ]
                    },
                    { // receiver_value
                        type: 'tg',
                        title: '$F$ receiver_value',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "mobile or email to receive this crm" },
                                    { type: "p", inner: "شماره موبایل یا ایمیل دریافت کننده این پیام" },
                                ],
                            },
                        ]
                    },
                    { // seen
                        type: 'tg',
                        title: '$F$ seen',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "indicate this crm seen by user or not." },
                                    { type: "p", inner: "مشخص می کند این crm توسط کاربر دیده شده است یا نه." },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "for popup this number indicate how many this popup must be shown up." },
                                    { type: "p", inner: "برای popup این عدد نشان می دهد که این popup چند بار باید دیده شود." },
                                ],
                            },
                        ]
                    },

                ]
            },
            { // status
                type: 'tg',
                title: '$F$ status',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {pending: 1,success: 2,reject: 3}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'status of crm',
                            'وضعیت crm',
                        ],
                    },
                ]
            },
            { // date
                type: 'tg',
                title: '$F$ date',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            {type:"p",inner:"date to send crm, for scheduling sending"},
                            {type:"p",inner:"تاریخ ارسال، برای برنامه ریزی ارسال"},
                        ],
                    },
                ]
            },
            { // response
                type: 'tg',
                title: '$EO$$F$ response',
                inner: [
                    {
                        type: 'bl',
                        inner: "Mixed Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            {type:"p",inner:"date of api"},
                            {type:"p",inner:"مقدار بازگشتی از api"},
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
                        inner: 'id of user that created this crm',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کاربر سازنده این crm',
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
                            'title of crm',
                            'عنوان crm',
                        ],
                    },
                ]
            },
            { // message
                type: 'tg',
                title: '$F$ message',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'message of crm',
                            'متن پیام crm',
                        ],
                    },
                ]
            },
            { // seen
                type: 'tg',
                title: '$V$ seen',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'indicate logged in user seen this crm or not',
                            'مشخص می کند که کاربری که لاگین کرده، این crm را دیده یا نه.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            '"seen" field located in "send_to" array.',
                            'فیلد "seen" در آرایه "send_to" قرار دارد.',
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
                        inner: 'Date and time that crm created',
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
                        inner: 'Date and time that crm updated',
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
                        inner: 'search in title and message field',
                    },
                    {
                        type: 'bl',
                        inner: 'جهت جست و جو در عنوان و پیام',
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
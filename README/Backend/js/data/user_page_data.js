const UserPage = {
    pageTitle: "User",
    pageHeaderIcon: '👫',
    pageHeaderTitle: 'User',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'UserPageContent',
        }
    ]
}

const UserPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    'never show password field',
                    'هرگز فیلد رمز عبور نمایش داده نشود.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    '"access_name", "gender" and "media" fields are virtual and must be added as graphql relations',
                    'فیلد های "access_name", "gender" و "media" به صورت مجازی هستند و باید به صورت رابطه به مدل اضافه شوند.',
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
            { // password
                type: 'tg',
                title: '$F$ password',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'hashed string of password',
                            'متن هش شده رمز کاربر'
                        ],
                    },
                ]
            },
            { // is_active
                type: 'tg',
                title: '$F$ is_active',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'indicate user can login or not',
                            'مشخص میکند کاربر اجازه لاگین کردن دارد یا نه'
                        ],
                    },
                ]
            },
            { // tokens
                type: 'tg',
                title: '$F$ tokens',
                inner: [
                    {
                        type: 'bl',
                        inner: "Mixed Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'user tokens. for example "jwt token" or "reset password token" will be stored here.',
                            'توکن های کاربر. برای مثال توکن های "jwt"یا "reset password" در این فیلد ذخیره می شود.'
                        ],
                    },
                ]
            },
            { // push_notifications
                type: 'tg',
                title: '$A$$F$ push_notifications',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'push notification tokens of user will be stored here.',
                            'توکن های ارسال اعلان در این فیلد ذخیره می شوند.'
                        ],
                    },
                ]
            },
            { // access_id
                type: 'tg',
                title: '$F$ access_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'id of access of user',
                            'آیدی دسترسی کاربر'
                        ],
                    },
                ]
            },
            { // user_information
                type: 'tg',
                title: '$EO$$F$ user_information',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'extra information about user (e.g profile image or user addresses) will be stored in this field.',
                            'اطلاعات اضافه کاربر مثل ادرس ها و جنسیت و یا عکس پروفایل در این فیلد ذخیره می شود.',
                        ],
                    },
                ]
            }, // todo complete user information document
        ]
    },
    { // public fields
        type: 'tg',
        title: '$-Public Fields:-$',
        open: true,
        id: 'public-fields-section',
        inner: [
            { // name
                type: 'tg',
                title: '$F$ name',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'name of user',
                            'نام',
                        ],
                    },
                ]
            },
            { // lastname
                type: 'tg',
                title: '$F$ lastname',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'last name of user',
                            'نام خانوادگی',
                        ],
                    },
                ]
            },
            { // fullname
                type: 'tg',
                title: '$V$ fullname',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(String)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'first-name + last-name of user',
                            'ترکیب نام و نام خانوادگی',
                        ],
                    },
                ]
            },
            { // username
                type: 'tg',
                title: '$F$ username',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'username of user',
                            'نام کاربری',
                        ],
                    },
                ]
            },
            { // email
                type: 'tg',
                title: '$F$ email',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'email of user',
                            'ایمیل',
                        ],
                    },
                ]
            },
            { // mobile
                type: 'tg',
                title: '$F$ mobile',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'mobile of user',
                            'شماره موبایل',
                        ],
                    },
                ]
            },
            { // access_name
                type: 'tg',
                title: '$V$ access_name',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'name of access or role of user',
                            'نام سطح دسترسی یا نقش کاربر',
                        ],
                    },
                ]
            },
            { // gender
                type: 'tg',
                title: '$V$ gender',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'male': 1,'female': 2,'unknown': 3}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'gender of user',
                            'جنسیت کاربر',
                        ],
                    },
                ]
            },
            { // media
                type: 'tg',
                title: '$V$$EO$ media',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'profile image of user',
                            'عکس پروفایل'
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
                        inner: 'Date and time that user created',
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
                        inner: 'Date and time that user updated',
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
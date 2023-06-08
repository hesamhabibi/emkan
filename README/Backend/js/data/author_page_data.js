const AuthorPage = {
    pageTitle: "Author",
    pageHeaderIcon: '👩',
    pageHeaderTitle: 'Author(User)',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'AuthorPageContent',
        }
    ]
}

const AuthorPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    'the author just contain some public information of user, not all user information.',
                    'نویسنده فقط شامل برخی اطلاعات عمومی کاربران است، نه همه اطلاعات کاربر.',
                ],
            },
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
                            'name of author user',
                            'نام نویسنده',
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
                            'last name of author user',
                            'نام خانوادگی نویسنده',
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
                            'first-name + last-name of author user',
                            'ترکیب نام و نام خانوادگی نویسنده',
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
                            'email of author user',
                            'ایمیل نویسنده',
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
                            'profile image of author',
                            'عکس پروفایل نویسنده'
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
        ]
    },
    { // footnote
        type: 'ref',
        ref: 'footnote',
    }
];
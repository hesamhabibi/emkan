const TagPage = {
    pageTitle: "Tag & TagGroup",
    pageHeaderIcon: '🖇',
    pageHeaderTitle: 'Tag & TagGroup',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'TagPageContent',
        }
    ]
}

const TagPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: 'always filter query by "deep" fields to get only tag or tag_group',
            },
            {
                type: 'bl',
                inner: 'همیشه کوئری را بر اساس فیلد "deep" فیلتر کنید تا فقط تگ ها یا گروه تگ ها را بگیرید.',
            },
            {
                type: 'bl',
                inner: [
                    { type: 'p', inner: 'just if this instance is tag (deep:1) has tag_group_ids field', },
                    { type: 'p', inner: 'فقط در صورتی که این مورد از نوع تگ (deep:1) باشد، فیلد "tag_group_ids" مقدار دارد.', },
                ]
            },
        ]
    },
    { // private fields
        type: 'tg',
        title: '$-Private Fields:-$',
        open: true,
        id: 'private-fields-section',
        inner: [
            { // deep
                type: 'tg',
                title: '$F$ deep',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate this instance is tag or tag_group', },
                            { type: 'p', inner: 'مشخص می کند که این مورد تگ است یا گروه تگ.', },
                        ]
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'always filter tags with deep field', },
                            { type: 'p', inner: 'همیشه کوئری تگ ها را بر اساس فیلد "deep" فیلتر کنید.', },
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
                            { type: 'p', inner: 'title of tag or tag_group', },
                            { type: 'p', inner: 'عنوان تگ یا گروه تگ', },
                        ]
                    },
                ]
            },
            { // tag_group_ids
                type: 'tg',
                title: '$F$ tag_group_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of tag_group of this tag', },
                            { type: 'p', inner: 'آیدی گروه تگ این تگ.', },
                        ]
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'just if this instance is tag (deep:1) has tag_group_ids field', },
                            { type: 'p', inner: 'فقط در صورتی که این مورد از نوع تگ (deep:1) باشد، فیلد "tag_group_ids" مقدار دارد.', },
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
                        inner: [
                            { type: 'p', inner: 'Date and time that tag or tag_group created', },
                            { type: 'p', inner: 'زمان ساخته شدن تگ یا گروه تگ', },
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
                            { type: 'p', inner: 'Date and time that tag or tag_group updated', },
                            { type: 'p', inner: 'زمان آخرین ویرایش تگ یا گروه تگ', },
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
const MediaPage = {
    pageTitle: "Media",
    pageHeaderIcon: '🖼',
    pageHeaderTitle: 'Media',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'MediaPageContent',
        }
    ]
}

const MediaPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    { type: 'p', inner: 'never show "path", "filename", "user_id" of media' },
                    { type: 'p', inner: 'فیلد های "path"، "filename" و "user_id" نباید نمایش داده شوند.' },
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
            { // path
                type: 'tg',
                title: '$F$ path',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'path of media stored on disk' },
                            { type: 'p', inner: 'مسیری که فایل در آن ذخیره شده' },
                        ],
                    },
                ]
            },
            { // filename
                type: 'tg',
                title: '$F$ filename',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'filename of media file that stored on disk' },
                            { type: 'p', inner: 'نام فایل ذخیره شده' },
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
                        inner: 'id of user(author) that created this blog',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کاربر آپلود کننده این مدیا',
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
            { // is_embedded
                type: 'tg',
                title: '$F$ is_embedded',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate media contain embedded_html' },
                            { type: 'p', inner: 'مشخص می کند مدیا از نوع embedded است یا نه.' },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'if "is_embedded" is true "embedded_html" has data, otherwise use "url".' },
                            { type: 'p', inner: 'اگر فیلد "is_embedded" مقدار true داشت یعنی فیلد "embedded_html" دارای متن html برای نمایش است، در غیر این صورت برای نمایش مدیا میتواند از "url"استفاده کند.' },
                        ],
                    },
                ]
            },
            { // embedded_html
                type: 'tg',
                title: '$F$ embedded_html',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'html of embedded media' },
                            { type: 'p', inner: 'متن html برای نمایش مدیا.' },
                        ],
                    },
                ]
            },
            { // is_public
                type: 'tg',
                title: '$F$ is_public',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate media is public or private' },
                            { type: 'p', inner: 'مشخص می کند که مدیا public است یا private.' },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'private medias can be downloaded if that user has access to that media' },
                            { type: 'p', inner: ' مدیا های private فقط برای کاربرانی که به آن مدیا دسترسی داشته باشند قابل دانلود است.' },
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
                        inner: { type: 'p', inner: 'url of media' },
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'can be used in "src" property of image tag ' },
                            { type: 'p', inner: 'برای نمایش تصویر می توان از مقدار url را در src تگ media گزاشته شود.' },
                        ],
                    },
                ]
            },
            { // extension
                type: 'tg',
                title: '$F$ extension',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: { type: 'p', inner: 'extension of media' },
                    },
                ]
            },
            { // main
                type: 'tg',
                title: '$F$ main',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate media used in media_gallery is main' },
                            { type: 'p', inner: 'مشخص کننده مدیا اصلی در گالری تصاویر' }
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
                        inner: "Enum: {video: 1,image: 2,audio: 3,unknown: 4,document: 5}",
                    },
                    {
                        type: 'bl',
                        inner: { type: 'p', inner: 'type of media' },
                    },
                ]
            },
            { // alt
                type: 'tg',
                title: '$F$ alt',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: { type: 'p', inner: 'alt text of media' },
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'can be used in "alt" property of image tag' },
                            { type: 'p', inner: 'برای alt image از این فیلد استفاده کنید.' },
                        ],
                    },
                ]
            },
            { // information
                type: 'tg',
                title: '$F$ information',
                inner: [
                    {
                        type: 'bl',
                        inner: "JSON",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'more info about media' },
                            { type: 'p', inner: 'توضیحات اضافه در مورد مدیا' },
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
                        inner: 'Date of creation',
                    },
                ]
            },
            { // updatedAt
                type: 'tg',
                title: '$F$ updatedAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: 'Date of last update',
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
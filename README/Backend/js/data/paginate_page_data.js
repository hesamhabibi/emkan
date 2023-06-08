const PaginatePage = {
    pageTitle: "Paginate",
    pageHeaderIcon: '📟',
    pageHeaderTitle: 'Paginate',
    pageHeaderProperties: {
        group: 'Utils',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'PaginatePageContent',
        }
    ]
}

const PaginatePageContent = [
    { // public fields
        type: 'tg',
        title: '$-Public Fields:-$',
        open: true,
        id: 'public-fields-section',
        inner: [
            { // page
                type: 'tg',
                title: '$F$ page',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'current page number', },
                            { type: 'p', inner: 'شماره صفحه فعلی', },
                        ]
                    },
                ]
            },
            { // limit
                type: 'tg',
                title: '$F$ limit',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'number of instance per page', },
                            { type: 'p', inner: 'تعداد موارد در هر صفحه', },
                        ]
                    },
                ]
            },
            { // total
                type: 'tg',
                title: '$F$ total',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'number of all instance', },
                            { type: 'p', inner: 'تعداد کل موارد', },
                        ]
                    },
                ]
            },
            { // pages
                type: 'tg',
                title: '$F$ pages',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'number of all pages', },
                            { type: 'p', inner: 'تعداد کل صفحه ها', },
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
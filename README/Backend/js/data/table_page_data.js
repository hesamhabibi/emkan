var TablePage = {
    pageTitle: "Models References",
    pageHeaderIcon: '📋',
    pageHeaderTitle: 'Models References',
    pageHeaderProperties: null,
    hasReturnLink: false,
    pageContent: [
        {
            type: 'table',
            header: [
                {
                    path: 'A',
                    title: 'Name'
                }, {
                    path: 'S',
                    title: 'group'
                },
            ],
            rows: [
                [
                    {
                        href: 'BlogPage',
                        id: 'BlogPage',
                        title: 'Blog Model',
                        icon: '📜',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'AuthorPage',
                        id: 'AuthorPage',
                        title: 'Author',
                        icon: '👩',
                    },
                    {
                        title: 'Util',
                    }
                ],
                [
                    {
                        href: 'CategoryPage',
                        id: 'CategoryPage',
                        title: 'Category Model',
                        icon: '🔗',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'TagPage',
                        id: 'TagPage',
                        title: 'Tag & TagGroup Model',
                        icon: '🖇',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'MediaPage',
                        id: 'MediaPage',
                        title: 'Media Model',
                        icon: '🖼',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'CommentPage',
                        id: 'CommentPage',
                        title: 'Comment Model',
                        icon: '📝',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'SliderPage',
                        id: 'SliderPage',
                        title: 'Slider Model',
                        icon: '🎚',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'SEOPage',
                        id: 'SEOPage',
                        title: 'SEO Model',
                        icon: '📂',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'PaginatePage',
                        id: 'PaginatePage',
                        title: 'Paginate Model',
                        icon: '📃',
                    },
                    {
                        title: 'Util',
                    }
                ],
                [
                    {
                        href: 'UserPage',
                        id: 'UserPage',
                        title: 'User Model',
                        icon: '👫',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'ProductPage',
                        id: 'ProductPage',
                        title: 'Product Model',
                        icon: '🍭',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'PricePage',
                        id: 'PricePage',
                        title: 'Price Model',
                        icon: '💵',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'AddressPage',
                        id: 'AddressPage',
                        title: 'Address Model',
                        icon: '🗺',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'CRMPage',
                        id: 'CRMPage',
                        title: 'CRM Model',
                        icon: '🤝',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'OrderPage',
                        id: 'OrderPage',
                        title: 'Order Model',
                        icon: '🛒',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'TransactionPage',
                        id: 'TransactionPage',
                        title: 'Transaction Model',
                        icon: '💵',
                    },
                    {
                        title: 'Model',
                    }
                ],
                [
                    {
                        href: 'SettingPage',
                        id: 'SettingPage',
                        title: 'Setting Model',
                        icon: '🔧',
                    },
                    {
                        title: 'Model',
                    }
                ],
                // [
                //     {
                //         href: 'AccessPage',
                //         id: 'AccessPage',
                //         title: 'Access Model',
                //         icon: '👮',
                //     },
                //     {
                //         title: 'Model',
                //     }
                // ],
            ].sort((a, b) => {
                if (a[0].title < b[0].title) return -1;
                if (a[0].title > b[0].title) return 1;
                return 0;
            }),
        }
    ]
}


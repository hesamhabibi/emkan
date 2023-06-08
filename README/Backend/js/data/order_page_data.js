const OrderPage = {
    pageTitle: "Order",
    pageHeaderIcon: '🛒',
    pageHeaderTitle: 'Order',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'OrderPageContent',
        }
    ]
}

const OrderPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    { type: 'p', inner: 'always filter query by "$-type-$" field to get order that you want' },
                    { type: 'p', innner: 'همیشه کوئری را بر اساس فیلد "type" فیلتر کنید تا سفارشات مورد نظر خود را بدست آورید.' },
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
                        inner: 'id of user that created this order',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کاربر این سفارش',
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'UserModel',
                            inner: 'User Model',
                        },
                    }
                ]
            },
            { // type
                type: 'tg',
                title: '$F$ type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'cart': 1,'pre_order': 2,'complete': 3}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicates order is completed or its cart yet.' },
                            { type: 'p', inner: 'مشخص می کند سفارش تکمیل شده است یا هنور سبد خرید است.' },
                        ],
                    },
                ]
            },

            // todo: add transaction
        ]
    },
    { // public fields
        type: 'tg',
        title: '$-Public Fields:-$',
        open: true,
        id: 'public-fields-section',
        inner: [
            { // discount_id
                type: 'tg',
                title: '$F$ discount_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'id of discount that attached to this order',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کد تخفیفی که به این سفارش وصل شده.',
                    },
                ]
            },
            { // transaction_id
                type: 'tg',
                title: '$F$ transaction_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'id of last transaction (successful) that attached to this order',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی تراکنش آخر (موفق) که به این سفارش وصل شده.',
                    },
                ]
            },
            { // address_id
                type: 'tg',
                title: '$F$ address_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'id of user address that attached to this order',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی آدرس کاربر که به این سفارش وصل شده.',
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'AddressModel',
                            inner: 'Address Model',
                        },
                    }
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
                            { type: 'p', inner: 'date that order type from "cart" changed to "complete"' },
                            { type: 'p', inner: 'تاریخ تبدیل شدن سبد خرید به سفارش' },
                        ],
                    },
                ]
            },
            { // number
                type: 'tg',
                title: '$F$ number',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'number of factor, will generate automatically' },
                            { type: 'p', inner: 'شماره فاکتور، به صورت خودکار ساخته می شود.' },
                        ],
                    },
                ]
            },
            { // post_track_code
                type: 'tg',
                title: '$F$ post_track_code',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'post track code, admin will insert that for each order' },
                            { type: 'p', inner: 'شماره رهگیری پست، برای هر سفارش توسط ادمین پر می شود.' },
                        ],
                    },
                ]
            },
            { // shipping_method
                type: 'tg',
                title: '$F$ shipping_method',
                inner: [
                    {
                        type: 'bl',
                        inner: "Number",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'shipping method' },
                            { type: 'p', inner: 'روش ارسال' },
                        ],
                    },
                ]
            },
            { // payment_method
                type: 'tg',
                title: '$F$ payment_method',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'payment method' },
                            { type: 'p', inner: 'روش پرداخت' },
                        ],
                    },
                ]
            },
            { // status
                type: 'tg',
                title: '$F$ status',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'reject': 1,'complete': 2,'pending': 3,'packing': 4,'sending': 5}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicates status of order.' },
                            { type: 'p', inner: 'وضعیت سفارش را مشخص می کند.' },
                        ],
                    },
                ]
            },
            { // note
                type: 'tg',
                title: '$F$ note',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'user note for this order.' },
                            { type: 'p', inner: 'یادداشت کاربر برای این سفارش.' },
                        ],
                    },
                ]
            },
            { // products
                type: 'tg',
                title: '$F$$A$ products',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'list of items in cart.', },
                            { type: 'p', inner: 'لیست اقلام موجود در سبد خرید', },
                        ],
                    },
                    { // product_id
                        type: 'tg',
                        title: '$F$ product_id',
                        inner: [
                            {
                                type: 'bl',
                                inner: "ObjectId",
                            },
                            {
                                type: 'bl',
                                inner: 'id of product that is in this order',
                            },
                            {
                                type: 'bl',
                                inner: 'آیدی محصولی که در این سفارش است.',
                            },
                        ]
                    },
                    { // mix_variant_keys
                        type: 'tg',
                        title: '$A$$F$ mix_variant_keys',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Array of String",
                            },
                            {
                                type: 'bl',
                                inner: 'indicate which mix variant of product',
                            },
                            {
                                type: 'bl',
                                inner: 'مشخص می کند کدام mix_variant از محصول مد نظر است.',
                            },
                        ]
                    },
                    { // count
                        type: 'tg',
                        title: '$F$ count',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: 'p', inner: 'how much of product.' },
                                    { type: 'p', inner: 'تعداد محصول.' },
                                ],
                            },
                        ]
                    },
                    { // note
                        type: 'tg',
                        title: '$F$ note',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: 'p', inner: 'user note for this product in cart.' },
                                    { type: 'p', inner: 'یادداشت کاربر برای این محصول در سفارش.' },
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
                        inner: 'Date and time that order created',
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
                        inner: 'Date and time that order updated',
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
            { type: 'bl', inner: '$F$ status' },
            { type: 'bl', inner: '$F$ date' },
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
            { // shipping method
                type: 'tg',
                title: 'shipping_method',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'filter by shipping_method',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس shipping_method',
                    },
                ]
            },
            { // payment method
                type: 'tg',
                title: 'payment_method',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'filter by payment_method',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس payment_method',
                    },
                ]
            },
            { // status
                type: 'tg',
                title: 'status',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: 'filter by status',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس status',
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
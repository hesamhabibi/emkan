const PricePage = {
    pageTitle: "Price",
    pageHeaderIcon: '💵',
    pageHeaderTitle: 'Price',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'PricePageContent',
        }
    ]
}

const PricePageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    { type: 'p', inner: 'offer price can be null. if this field is null "price" fields is main_price"', },
                    { type: 'p', inner: 'این فیلد می تواند null باشد. اگر فیلد "offer_price" null بود مقدار "price" به عنوان قیمت اصلی استفاده می شود.', },
                    { type: 'p', inner: 'همچنین فقط در صورتی "offer-price"به عنوان قیمت اصلی انتخاب می شود که زمان "offer_startAt" نگذشته باشد و زمان "offer_expireAt" نرسیده باشد.', },
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
            { // type
                type: 'tg',
                title: '$F$ type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'normal': 1,'bag': 2}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate this price used for product or for bag item', },
                            { type: 'p', inner: 'مشخص می کند که این قیمت برای محصول استفاده شده یا به یکی از موارد سبد متصل شده است..', },
                        ]
                    },
                ]
            },
            { // model_name
                type: 'tg',
                title: '$F$ model_name',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                ]
            },
            { // model_id
                type: 'tg',
                title: '$F$ model_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                ]
            },
            { // model_variant_keys
                type: 'tg',
                title: '$A$$F$ model_variant_keys',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of String",
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
            { // price
                type: 'tg',
                title: '$F$ price',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'price without discount offer', },
                            { type: 'p', inner: 'قیمت بدون تخفیف', },
                        ]
                    },
                ]
            },
            { // offer_price
                type: 'tg',
                title: '$F$ offer_price',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'price with discount', },
                            { type: 'p', inner: 'قیمت با تخفیف', },
                        ]
                    },
                ]
            },
            { // offer_startAt
                type: 'tg',
                title: '$F$ offer_startAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'Date that offer price is valid', },
                            { type: 'p', inner: 'زمانی که بعد از آن قیمت تخفیفی معتبر است', },
                        ],
                    },
                ]
            },
            { // offer_expireAt
                type: 'tg',
                title: '$F$ offer_expireAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'Date that offer price is not valid anymore', },
                            { type: 'p', inner: 'زمانی که بعد از آن قیمت تخفیفی معتبر نیست', },
                        ],
                    },
                ]
            },
            { // discount_percent
                type: 'tg',
                title: '$F$ discount_percent',
                inner: [
                    {
                        type: 'bl',
                        inner: "Float",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'discount percent', },
                            { type: 'p', inner: 'درصد تخفیف.', },
                        ],
                    },
                ]
            },
            { // main_price
                type: 'tg',
                title: '$V$ main_price',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'main price that will use in orders.', },
                            { type: 'p', inner: 'قیمت اصلی که در فاکتور و سفارش استفاده می شود.', },
                        ]
                    },
                ]
            },
            { // old_price
                type: 'tg',
                title: '$V$ old_price',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'if has offer_price then old_price is price that will not used.', },
                            { type: 'p', inner: 'در صورتی که قیمت "offer_price" مقدار داشته باشد، مقدار "old_price" برابر با قیمت "price" است.', },
                        ]
                    },
                ]
            },
            { // has_offer
                type: 'tg',
                title: '$V$ has_offer',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicates main price is "offer_price" or "price".', },
                            { type: 'p', inner: 'مشخص می کند که قیمت اصلی از "offer_price"بدست امده یا "price".', },
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
                            { type: 'p', inner: 'Date and time that Price created', },
                            { type: 'p', inner: 'زمان ساخته شدن سئو', },
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
                            { type: 'p', inner: 'Date and time that Price updated', },
                            { type: 'p', inner: 'زمان آخرین ویرایش سئو', },
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
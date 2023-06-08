const AddressPage = {
    pageTitle: "Address",
    pageHeaderIcon: '🗺',
    pageHeaderTitle: 'Address',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'AddressPageContent',
        }
    ]
}

const AddressPageContent = [
    { // private fields
        type: 'tg',
        title: '$-Private Fields:-$',
        open: true,
        id: 'private-fields-section',
        inner: [
            { // model_name
                type: 'tg',
                title: '$F$ model_name',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'name of model of morph relation', },
                            { type: 'p', inner: 'نام مدل برای رابطه مرف.', },
                        ]
                    },
                ]
            },
            { // model_id
                type: 'tg',
                title: '$F$ model_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of model of morph relation', },
                            { type: 'p', inner: 'آیدی مدل برای رابطه مرف.', },
                        ]
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
            { // postal_code
                type: 'tg',
                title: '$F$ postal_code',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: '10 digits postal code', },
                            { type: 'p', inner: 'کد پستی ۱۰ رقمی', },
                        ]
                    },
                ]
            },
            { // city_id
                type: 'tg',
                title: '$F$ city_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of city. to get list of all cities use SettingModel' },
                            { type: 'p', inner: 'آیدی شهر. برای گرفتن لیست شهر ها از مدل SettingModel استفاده کنید.' },
                            { type: 'p', inner: 'const all_cities = await SettingModel.findByKey("all_cities");' },
                        ],
                    },
                ]
            },
            { // state_id
                type: 'tg',
                title: '$F$ state_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'id of state. to get list of all states use SettingModel' },
                            { type: 'p', inner: 'آیدی استان. برای گرفتن لیست استان ها از مدل SettingModel استفاده کنید.' },
                            { type: 'p', inner: 'const all_states = await SettingModel.findByKey("all_states");' },
                        ],
                    },
                ]
            },
            { // address
                type: 'tg',
                title: '$F$ address',
                inner: [
                    {
                        type: 'bl',
                        inner: "String",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'Full address', },
                            { type: 'p', inner: 'آدرس کامل', },
                        ]
                    },
                ]
            },
            { // location
                type: 'tg',
                title: '$EO$$F$ location',
                inner: [
                    {
                        type: 'bl',
                        inner: "Mixed Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'latitude, longitude and zoom of location on map', },
                            { type: 'p', inner: 'طول و عرض جغرافیایی و بزرگنمایی مکان روی نقشه', },
                        ]
                    },
                ]
            },
            { // is_default
                type: 'tg',
                title: '$F$ is_default',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'indicate this is address is default address of user or not', },
                            { type: 'p', inner: 'مشخص می کند این آدرس پیش فرض کاربر است یا نه', },
                        ]
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'just one of user addresses can be default', },
                            { type: 'p', inner: 'تنها یکی از آدرس های کاربر می تواند پیش فرض باشد.', },
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
                            { type: 'p', inner: 'Date and time that address created', },
                            { type: 'p', inner: 'زمان ساخته شدن آدرس', },
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
                            { type: 'p', inner: 'Date and time that address updated', },
                            { type: 'p', inner: 'زمان آخرین ویرایش آدرس', },
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
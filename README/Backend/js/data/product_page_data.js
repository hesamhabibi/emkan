const ProductPage = {
    pageTitle: "Product",
    pageHeaderIcon: '🍭',
    pageHeaderTitle: 'Product',
    pageHeaderProperties: {
        group: 'Model',
    },
    pageContent: [
        {
            type: 'ref',
            ref: 'ProductPageContent',
        }
    ]
}

const ProductPageContent = [
    { // notes
        type: 'tg',
        title: '$-notes:-$',
        open: true,
        id: 'notes-section',
        inner: [
            {
                type: 'bl',
                inner: [
                    'always filter query by "$-type-$" field to get products that you want',
                    'همیشه کوئری را بر اساس فیلد "type" فیلتر کنید تا محصولات مورد نظر خود را بدست آورید.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    'just show products that has "$-show-$" "$-status-$" and $-past-$ "$-publishAt-$"',
                    'فقط محصولاتی که "status" آنها مقدار "show" دارد و "publicAt" آنها گذشته است را نشان دهید.',
                ],
            },
            {
                type: 'bl',
                inner: [
                    'just show mix_variant that has true "is_active" field',
                    'فقط "mix_variant" هایی نمایش داده شود که فیلد "is_active" آنها برابر true باشد.',
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
            { // status
                type: 'tg',
                title: '$F$ status',
                inner: [
                    {
                        type: 'bl',
                        inner: "type: enum: {'inactive': 1,'show': 2,'draft': 3}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'just show product if its status is "show".',
                            'فقط محصولاتی نمایش داده شوند که مقدار "status" آنها "show" باشد.'
                        ],
                    },
                ]
            },
            { // publishAt
                type: 'tg',
                title: '$F$ publishAt',
                inner: [
                    {
                        type: 'bl',
                        inner: "Date",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'just show products if its publishAt is past.' },
                            { type: "p", inner: 'فقط محصولاتی نمایش داده شوند که مقدار "publishAt" آنها گذشته باشد.' }
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
                        inner: "Enum: {'product': 1,'download': 2,'service': 3,'preview': 4}",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'type of product can be "product", "download", "service" or "preview".',
                            'نوع محصول، می تواند "product"، "download"، "service" و یا "preview" باشد.'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: "always filter query by type to get just blogs that you want",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "type: \"product\" : is physical product that has weight and shipping stuff " },
                            { type: "p", inner: "نوع: \"product\" : محصول فیزیکی که وزن و موارد ارسال دارد." }
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "type: \"download\" : is downloadable file that has price, download access will granted after that user bought product." },
                            { type: "p", inner: "نوع: \"download\" : محصول یک فایل قابل دانلود است، دسترسی برای دانلود فایل بعد از خرید محصول بدست می آید." }
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "type: \"service\" : product type service doesn't have weight and shipping stuff" },
                            { type: "p", inner: "نوع: \"service\" : محصول از نوع خدمات وزن و موارد ارسال ندارد." }
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "type: \"preview\" : preview doesn't have price, its just a prerelease product." },
                            { type: "p", inner: "نوع: \"preview\" : محصول از نوع پیش نمایش قیمت ندارد و قابل خرید نیست و تنها جهت نمایش محصول قبل از ارائه می باشد." }
                        ],
                    },
                ]
            },
            { // services
                type: 'tg',
                title: '$EO$$F$ services',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    { // api_config
                        type: 'tg',
                        title: '$EO$$F$ api_config',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Embedded Object",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "some api config to call api endpoint when service sold to user" },
                                    { type: "p", inner: "تنظیمات api برای زمانی که کاربری این خدمت را خریداری کرد.." },
                                ],
                            },
                            { // type
                                type: 'tg',
                                title: '$F$ type',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Enum: {'rest': 1,'graphql': 2}",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'type of api endpoint' },
                                            { type: "p", inner: 'نوع api.', },
                                        ],
                                    },
                                ]
                            },
                            { // app_key
                                type: 'tg',
                                title: '$F$ app_key',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "String",
                                    },
                                    {
                                        type: 'bl',
                                        inner: { type: "p", inner: 'app key to send with details' },
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
                                        inner: { type: "p", inner: 'url to send api request' },
                                    },
                                ]
                            },
                            { // mutation
                                type: 'tg',
                                title: '$F$ mutation',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "String",
                                    },
                                    {
                                        type: 'bl',
                                        inner: { type: "p", inner: 'mutation to send for graphql requests' },
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { // tutorials.user_access
                type: 'tg',
                title: '$A$$F$ tutorials.user_access',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'list of users id that has access to this toturial' },
                            { type: "p", inner: 'لیست آیدی های کابرانی که به این آموزش دسترسی دارند.', },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'dont show this field' },
                            { type: "p", inner: 'این فیلد نمایش داده نشود.', },
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
                        inner: 'id of user that created this product',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی کاربر سازنده این محصول',
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
                            { type: "p", inner: 'title of "product"' },
                            { type: "p", inner: 'عنوان محصول' },
                        ],
                    },
                ]
            },
            { // summary
                type: 'tg',
                title: '$F$ summary',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'summary of "product"' },
                            { type: "p", inner: 'متن خلاصه محصول' },
                        ],
                    },
                ]
            },
            { // description
                type: 'tg',
                title: '$F$ description',
                inner: [
                    {
                        type: 'bl',
                        inner: "multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'description or content of "product"' },
                            { type: "p", inner: 'متن اصلی محصول' },
                        ],
                    },
                ]
            },
            { // strengths
                type: 'tg',
                title: '$F$ strengths',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'list of strength features of "product"' },
                            { type: "p", inner: 'لیستی از نقاط قوت محصول' }
                        ],
                    },
                ]
            },
            { // weaknesses
                type: 'tg',
                title: '$F$ weaknesses',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'list of weaknesses of "product"' },
                            { type: "p", inner: 'لیستی از نقاط ضعف محصول' }
                        ],
                    },
                ]
            },
            { // main_features
                type: 'tg',
                title: '$F$ main_features',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of multi language",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: 'list of main_features of "product"' },
                            { type: "p", inner: 'لیستی از ویژگی های مهم محصول' }
                        ],
                    },
                ]
            },
            { // has_rating
                type: 'tg',
                title: '$F$ has_rating',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "indicate this product has rating feature or not." },
                            { type: "p", inner: "مشخص می کند این محصول قابلیت امتیاز دهی دارد یا نه." }
                        ],
                    },
                ]
            },
            { // has_comment
                type: 'tg',
                title: '$F$ has_comment',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "indicate this product has commenting feature or not." },
                            { type: "p", inner: "مشخص می کند این محصول قابلیت نظر دهی دارد یا نه." }
                        ],
                    },
                ]
            },
            { // is_special
                type: 'tg',
                title: '$F$ is_special',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "indicate this product is special or not. special products has \"special\" tag on its card." },
                            { type: "p", inner: "مشخص می کند این محصول ویژه است یا نه. برای محصول ویژه یک تگ \"ویژه\" روی کارت آن نمایش داده می شود" }
                        ],
                    },
                ]
            },
            { // price
                type: 'tg',
                title: '$V$ price',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'price of main "mix_variant"',
                            'مدل قیمتی که "mix_variant" اصلی وصل شده.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'PricePage',
                            inner: 'Price Model',
                        },
                    }
                ]
            },
            { // details
                type: 'tg',
                title: '$EO$$V$ details',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'details that attached to main "mix_variant".' },
                            { type: 'p', inner: 'جرئیات متصل شده به "mix_variant" اصلی.' },
                        ],
                    },
                    { // warehouse
                        type: 'tg',
                        title: '$F$ warehouse',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "address of product in warehouse" },
                                    { type: "p", inner: 'آدرس کالا در انبار' }
                                ],
                            },
                        ]
                    },
                    { // product_code
                        type: 'tg',
                        title: '$F$ product_code',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "product code use for warehousing and accounting" },
                                    { type: "p", inner: 'کد محصول حهت استفاده در انبارداری و حسابداری' }
                                ],
                            },
                        ]
                    },
                    { // use_count
                        type: 'tg',
                        title: '$F$ use_count',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Boolean",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "just if use_count is true, check count when adding this product to cart, otherwise ignore count." },
                                    { type: "p", inner: 'هنگام اضافه کردن این محصول به سبد خرید فقط در صورتی که مقدار "use_count" "true" است مقدار "count" چک شود در غیر این صورت مقدار "count" نادیده بگیرید.' }
                                ],
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
                                    { type: "p", inner: "number of products in wqrehouse" },
                                    { type: "p", inner: 'تعداد کالا در انبار' }
                                ],
                            },
                        ]
                    },
                    { // count_status
                        type: 'tg',
                        title: '$F$ count_status',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Enum: {'available': 1,'contact_for_price': 2,'coming_soon': 3,'not_available': 4,'end_of_production': 5,'price_fluctuation': 6}",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "status of prodcuct" },
                                    { type: "p", inner: 'وضعیت محصول.' }
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'dont show price if count_status is not "available"' },
                                    { type: "p", inner: 'فقط در صورتی که "count_status" مقدار "available" بود قیمت نمایش داده شود.' }
                                ],
                            },
                        ]
                    },
                    { // count_unit
                        type: 'tg',
                        title: '$F$ count_unit',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Enum: {...} (see 'details_count_units' in ProductModel)",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "unit of count" },
                                    { type: "p", inner: 'واحد تعداد.' }
                                ],
                            },
                        ]
                    },
                    { // limit_min
                        type: 'tg',
                        title: '$F$ limit_min',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "minimum number of products can be added to cart" },
                                    { type: "p", inner: 'حداقل تعداد قابل خرید.' }
                                ],
                            },
                        ]
                    },
                    { // limit_max
                        type: 'tg',
                        title: '$F$ limit_max',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "maximum number of products can be added to cart" },
                                    { type: "p", inner: 'حداکثر تعداد قابل خرید.' }
                                ],
                            },
                        ]
                    },
                    { // length
                        type: 'tg',
                        title: '$F$ length',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "length of product in cm" },
                                    { type: "p", inner: 'طول محصول در واحد سانتی متر.' }
                                ],
                            },
                        ]
                    },
                    { // width
                        type: 'tg',
                        title: '$F$ width',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "width of product in cm" },
                                    { type: "p", inner: 'عرض محصول در واحد سانتی متر.' }
                                ],
                            },
                        ]
                    },
                    { // height
                        type: 'tg',
                        title: '$F$ height',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "height of product in cm" },
                                    { type: "p", inner: 'ارتفاع محصول در واحد سانتی متر.' }
                                ],
                            },
                        ]
                    },
                    { // weight
                        type: 'tg',
                        title: '$F$ weight',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "weight of product in grams" },
                                    { type: "p", inner: 'ورن محصول در واحد گرم.' }
                                ],
                            },
                        ]
                    },
                ]
            },
            { // category_id
                type: 'tg',
                title: '$F$ category_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'id of category attached to this product',
                            'آیدی دسته بندی که محصول در آن قرار دارد.',
                        ],
                    },
                ]
            },
            { // category
                type: 'tg',
                title: '$V$ category',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'category that attached to this product',
                            'اطلاعات دسته بندی که محصول در آن قرار دارد.'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'CategoryModel',
                            inner: 'Category Model',
                        },
                    }
                ]
            },
            { // brand_id
                type: 'tg',
                title: '$F$ brand_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'id of brand attached to this product',
                            'آیدی برندی که محصول در آن قرار دارد.',
                        ],
                    },
                ]
            },
            { // brand
                type: 'tg',
                title: '$V$ brand',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'brand that attached to this product',
                            'اطلاعات برندی که محصول در آن قرار دارد.'
                        ],
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'BrandModel',
                            inner: 'Brand Model',
                        },
                    }
                ]
            },
            { // media
                type: 'tg',
                title: '$F$$EO$ media',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'main media of "media_gallery"',
                            'تصویر اصلی محصول. این تصویریکی از تصاویر "image_gallery" است که به عنوان تصویر اصلی انتخاب شده است.'
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
            {// media_gallery
                type: 'tg',
                title: '$F$$A$$EO$ media_gallery',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of embedded object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'list of images',
                            'گالری تصاویر محصول',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            'if mix_variant doesn\'t have media_gallery use this media_gallery',
                            'در صورتی که "mix_variant" گالری تصاویر نداشت از این گالری استفاده شود.',
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
                        title: '$F$ sort',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Int",
                            },
                            {
                                type: 'bl',
                                inner: 'images must be sorted by this number',
                            },
                        ]
                    },
                    {
                        type: 'tg',
                        title: '$F$ is_main',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Boolean",
                            },
                            {
                                type: 'bl',
                                inner: 'indicate main media of gallery,just one of images is main',
                            },
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
            { // video
                type: 'tg',
                title: '$F$$EO$ video',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'video file attached to this product, show this video as teaser of product',
                            'ویدئو مربوط به تیزر این محصول.'
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
            { // files
                type: 'tg',
                title: '$F$$EO$ files',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Embedded Object(Array of media)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'files attached to this product.',
                            'فایل های محصول.'
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
            { // seo_id
                type: 'tg',
                title: '$F$ seo_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'id of seo that attached to this product',
                            'آیدی مدل سئوی که به این محصول وصل شده.'
                        ],
                    },
                ]
            },
            { // seo
                type: 'tg',
                title: '$V$ seo',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Relation)",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'seo that attached to this product',
                            'اطلاعات سئو وصل شده به این محصول. اطلاعاتی مثل عنوان صفحه، لینک(slug) و ... در این مدل ذخیره می شود.',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'SEOPage',
                            inner: 'SEO Model',
                        },
                    }
                ]
            },
            { // tag_ids
                type: 'tg',
                title: '$F$$A$ tag_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: [
                            'list of tag_id that directly attached to this product. To get a complete list of tags, this list must be merged with the list obtained from "tag_group_id". ',
                        ],
                    },
                    {
                        type: 'bl',
                        inner: 'لیست تگ هایی که به صورت مستقیم به این محصول وصل شده اند. برای گرفتن لیست کامل تگ ها باید این لیست با لیست بدست آمده از "tag_group_id" ادغام شود.',
                    },
                ]
            },
            { // tag_group_id
                type: 'tg',
                title: '$F$ tag_group_id',
                inner: [
                    {
                        type: 'bl',
                        inner: "ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'id of tag group that attached to this product',
                    },
                    {
                        type: 'bl',
                        inner: 'آیدی گروه تگی که به این محصول وصل شده.',
                    },
                ]
            },
            { // tags
                type: 'tg',
                title: '$A$$V$ tags',
                inner: [
                    {
                        type: 'bl',
                        inner: "Virtual(Array Relation)",
                    },
                    {
                        type: 'bl',
                        inner: 'list tags that attached to this product throw tag_ids field and tag_group_id fields',
                    },
                    {
                        type: 'bl',
                        inner: 'لیست همه تگ های متصل به این محصول. برای بدست آوردن این لیست باید مجموع تگ هایی که به صورت مستقیم به این محصول وصل شده و تگ هایی که از طریق گروه تگ وصل شده گرفته بشه.',
                    },
                    {
                        type: 'bl',
                        inner: {
                            type: 'a',
                            link: 'TagPage',
                            inner: 'Tag & TagGroup Model',
                        },
                    }
                ]
            },
            { // attribute_groups
                type: 'tg',
                title: '$F$ attribute_groups',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Embedded Object",
                    },
                    { // attribute_group_id
                        type: 'tg',
                        title: '$F$ attribute_group_id',
                        inner: [
                            {
                                type: 'bl',
                                inner: 'ObjectId',
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'id of attribute group that attached to this product' },
                                    { type: "p", inner: 'آیدی گروه ویژگی که به این محصول متصل شده.', },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'attribute group is headline of attributes.' },
                                    { type: "p", inner: 'گروه ویژگی، سرتیتر برای ویژگی ها است. برای مثال "پردازنده" یک گروه ویژگی است که "سازنده پردازنده > intel" و "سری پردازنده > Celeron" و "مدل پردازنده > N4000" ویژگی های این گروه هستند ', },
                                ],
                            },
                        ]
                    },
                    { // attributes
                        type: 'tg',
                        title: '$F$ attributes',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Array of Embedded Object",
                            },
                            { // attribute_id
                                type: 'tg',
                                title: '$F$ attribute_id',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: 'ObjectId',
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'id of attribute that attached to this attribute group' },
                                            { type: "p", inner: 'آیدی ویژگی که به این گروه ویژگی متصل شده.', },
                                        ],
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'example of attribute is "processor model:"' },
                                            { type: "p", inner: 'برای مثال ویژگی می تواند "مدل پردازنده" باشد.', },
                                        ],
                                    },
                                ]
                            },
                            { // attribute_value_id
                                type: 'tg',
                                title: '$F$ attribute_value_id',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: 'ObjectId',
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'id of attribute value that attached to this attribute' },
                                            { type: "p", inner: 'آیدی مقدار ویژگی که به این ویژگی متصل شده.', },
                                        ],
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'for example if attribute is "processor model:" then value is something like: "N4000"' },
                                            { type: "p", inner: 'برای مثال اگر ویژگی "مدل پردازنده" باشد مقدار ویژگی مقداری شبیه این دارد: "N4000".', },
                                        ],
                                    },
                                ]
                            }
                        ]
                    },
                ]
            },
            { // has_variant
                type: 'tg',
                title: '$F$ has_variant',
                inner: [
                    {
                        type: 'bl',
                        inner: "Boolean",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "indicate this product has variant." },
                            { type: "p", inner: "مشخص می کند این محصول گونه دارد یا نه." }
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "example of variant: \"Color\" variant of shirt" },
                            { type: "p", inner: "نمونه گونه: گونه \"رنگ\" برای پیراهن." }
                        ],
                    },
                ]
            },
            { // variant
                type: 'tg',
                title: '$A$$EO$$F$ variant',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "variant's of this product" },
                            { type: "p", inner: "گونه های محصول" }
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "example of variant: \"Color\" variant that has some labels:[\"red\",\"Green\",\"Blue\", ...]" },
                            { type: "p", inner: "نمونه گونه: گونه \"رنگ\" که تعدادی برچسب دارد: [\"قرمز\", \"سبز\", \"آبی\", ...]." }
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: "p", inner: "labels of variant's have deference types: \"text\": just a multi languate text, \"color\": a multi language text with color code, \"image\": each label has its image" },
                            { type: "p", inner: "برچسب های گونه ها انواع دارند: \n\"text\": فقط یک متن چند زبانه دارد, \n\"color\": شامل یک متن چند زبانه و یک کد رنگ است, \n\"image\": هر برچسب دارای تصویر یا آیکن خودش است" }
                        ],
                    },
                    { // name
                        type: 'tg',
                        title: "$F$ name",
                        inner: [
                            {
                                type: 'bl',
                                inner: "Multi Language",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "title of variant, for example \"size\"" },
                                    { type: "p", inner: "عنوان گونه مثلا \"اندازه\"." },
                                ],
                            },
                        ]
                    },
                    { // type
                        type: 'tg',
                        title: "$F$ type",
                        inner: [
                            {
                                type: 'bl',
                                inner: "Enum: {'text': 1,'color': 2,'image': 3}",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'type of labels of variant, can be : "text", "color","image"' },
                                    { type: "p", inner: 'نوع برچسب های گونه, می تواند "text", "color", "image" باشد.' },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: '"text": just have a multi language text, for example "size" variant: that have "l", "xxl" labels' },
                                    { type: "p", inner: '"text": فقط یک متن چند زبانه دارد. برای مثال گونه "size"که بر چست های "l" و "xxl"دارد.' },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: '"color": beside multi language text it has a color code too that can be used in web view' },
                                    { type: "p", inner: '"color": درکنار متن چند زبانه یک کد رنگ هم دارد که میشه ازش توی نمای وب استفاده کرد.' },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: '"image": its labels have an image preview. for example variant "type of fabric" that its labels can have an image preview of fabics ' },
                                    { type: "p", inner: '"image": هر یک از برچسب های این نوع گونه دارای یک تصویر است. برای مثال گونه "نوع پارچه" که برچسب های ان می تواند دارای یک تصویر از پارچه باشد.' },
                                ],
                            },
                        ]
                    },
                    { // labels
                        type: 'tg',
                        title: '$A$$EO$$F$ variant',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Array of Embedded Object",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "labels of variant" },
                                    { type: "p", inner: "برچسب های گونه" }
                                ],
                            },
                            { // key
                                type: 'tg',
                                title: "$F$ key",
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "String",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "unique key of this label. this key will be used in \"mix_variant\"" },
                                            { type: "p", inner: "کلید منحصر به فرد برچسب. از این کلید در \"mix_variant\" استفاده خواهد شد برای شناسایی این برچسب." },
                                        ],
                                    },
                                ]
                            },
                            { // title
                                type: 'tg',
                                title: "$F$ title",
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Multi Language",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "title of label" },
                                            { type: "p", inner: "عنوان برچسب" },
                                        ],
                                    },
                                ]
                            },
                            { // values
                                type: 'tg',
                                title: "$EO$$F$ values",
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Mixed Object",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "extra values of label, if type of label is \"color\", color code will be stored in this field, and if type of label is \"image\" media information of image will be stored here." },
                                            { type: "p", inner: "مقادیر اضافه برچسب. اگر نوع برچسب \"color\" باشد در این فیلد مقدار کد رنگ ذخیره خواهد شد و اگر نوع برچسب \"image\" باشد اطلاعات تصویر در این فیلد ذخیره خواهد شد." },
                                        ],
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },
            { // mix_variant
                type: 'tg',
                title: '$A$$EO$$F$ mix_variant',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: '"mix_variant" is a set of variant labels that can has its own price, details and media gallery.' },
                            { type: 'p', inner: '"mix_variant" یک مجموعه از برچسب های گونه است که میتواند قیمت، جرئیات، گالری تصاویر مجزا داشته باشد.' },
                        ],
                    },
                    {
                        type: 'bl',
                        inner: [
                            { type: 'p', inner: 'just one of "mix_variant"s can be main. price of main "mix_variant" is main price of product' },
                            { type: 'p', inner: 'فقط یکی از این "mix_variant" ها اصلی است. قیمت اصلی محصول توسط این "mix_variant" مشخص می شود.' },
                        ],
                    },
                    { // keys
                        type: 'tg',
                        title: "$A$$F$ keys",
                        inner: [
                            {
                                type: 'bl',
                                inner: "Array of String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "set of variants lebels keys." },
                                    { type: "p", inner: "مجموعه ای از کلید های برچسب های گونه ها." },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "this array includes exactly one key of each variants." },
                                    { type: "p", inner: "این آرایه شامل دقیقا یک کلید از هر گونه است." },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'for example if we have two variant ["size", "color"] and "size" contains ["l","xl"] labels and "color" contains ["red", "green"] labels then we should have 4 mix_variant with these keys: [1:["l","red"], 2:["xl","red"], 3:["l","green"], 4:["xl","green"]]' },
                                    { type: "p", inner: 'برای مثال اگر ما دو گونه داشته باشیم ["size", "color"] و گونه "size" شامل برچسب های ["l","xl"] باشد و گونه "color" شامل برچسب های ["red", "green"] باشد. در این صورت باید ۴ "mix_variant"  داشته باشم با کلید های: [1:["l","red"], 2:["xl","red"], 3:["l","green"], 4:["xl","green"]].' },
                                ],
                            },
                        ]
                    },
                    { // is_main_price
                        type: 'tg',
                        title: '$F$ is_main_price',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Boolean",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "indicate this mix_variant is main mix_variant of product or not." },
                                    { type: "p", inner: 'مشخص می کند این "mix_variant" اصلی است یا نه.' }
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: 'p', inner: 'just one of "mix_variant"s can be main. price of main "mix_variant" is main price of product' },
                                    { type: 'p', inner: 'فقط یکی از این "mix_variant" ها اصلی است. قیمت اصلی محصول توسط این "mix_variant" مشخص می شود.' },
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
                                inner: "Boolean",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "indicate this mix_variant is active or not." },
                                    { type: "p", inner: 'مشخص می کند این "mix_variant" فعال است یا نه.' }
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: 'p', inner: 'inactive "mix_variant" don\'t have details and price and cannot be added to cart.' },
                                    { type: 'p', inner: '"mix_variant" هایی که غیر فعال هستند جزئیات و قیمت ندارند و نباید نمایش داده شوند یا به سبد خرید اضافه شوند.' },
                                ],
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
                                    { type: "p", inner: "sort mix_variant's by this fields" },
                                    { type: "p", inner: '"mix_variant"ها بر اساس این فیلد مرتب شوند.' }
                                ],
                            },
                        ]
                    },
                    { // details
                        type: 'tg',
                        title: '$EO$$F$ details',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Embedded Object",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: 'p', inner: 'details of "mix_variant". for example product_code, count and weight and ... will be stored in this object.' },
                                    { type: 'p', inner: 'جزئیاتی در مورد"mix_variant".جزئیاتی مثل کد محصول، تعداد، وزن و ... در این فیلد ذخیره می شود.' },
                                ],
                            },
                            { // warehouse
                                type: 'tg',
                                title: '$F$ warehouse',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "String",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "address of product in warehouse" },
                                            { type: "p", inner: 'آدرس کالا در انبار' }
                                        ],
                                    },
                                ]
                            },
                            { // product_code
                                type: 'tg',
                                title: '$F$ product_code',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "String",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "product code use for warehousing and accounting" },
                                            { type: "p", inner: 'کد محصول حهت استفاده در انبارداری و حسابداری' }
                                        ],
                                    },
                                ]
                            },
                            { // use_count
                                type: 'tg',
                                title: '$F$ use_count',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Boolean",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "just if use_count is true, check count when adding this product to cart, otherwise ignore count." },
                                            { type: "p", inner: 'هنگام اضافه کردن این محصول به سبد خرید فقط در صورتی که مقدار "use_count" "true" است مقدار "count" چک شود در غیر این صورت مقدار "count" نادیده بگیرید.' }
                                        ],
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
                                            { type: "p", inner: "number of products in wqrehouse" },
                                            { type: "p", inner: 'تعداد کالا در انبار' }
                                        ],
                                    },
                                ]
                            },
                            { // count_status
                                type: 'tg',
                                title: '$F$ count_status',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Enum: {'available': 1,'contact_for_price': 2,'coming_soon': 3,'not_available': 4,'end_of_production': 5,'price_fluctuation': 6}",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "status of prodcuct" },
                                            { type: "p", inner: 'وضعیت محصول.' }
                                        ],
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'dont show price if count_status is not "available"' },
                                            { type: "p", inner: 'فقط در صورتی که "count_status" مقدار "available" بود قیمت نمایش داده شود.' }
                                        ],
                                    },
                                ]
                            },
                            { // count_unit
                                type: 'tg',
                                title: '$F$ count_unit',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Enum: {...} (see 'details_count_units' in ProductModel)",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "unit of count" },
                                            { type: "p", inner: 'واحد تعداد.' }
                                        ],
                                    },
                                ]
                            },
                            { // limit_min
                                type: 'tg',
                                title: '$F$ limit_min',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "minimum number of products can be added to cart" },
                                            { type: "p", inner: 'حداقل تعداد قابل خرید.' }
                                        ],
                                    },
                                ]
                            },
                            { // limit_max
                                type: 'tg',
                                title: '$F$ limit_max',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "maximum number of products can be added to cart" },
                                            { type: "p", inner: 'حداکثر تعداد قابل خرید.' }
                                        ],
                                    },
                                ]
                            },
                            { // length
                                type: 'tg',
                                title: '$F$ length',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "length of product in cm" },
                                            { type: "p", inner: 'طول محصول در واحد سانتی متر.' }
                                        ],
                                    },
                                ]
                            },
                            { // width
                                type: 'tg',
                                title: '$F$ width',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "width of product in cm" },
                                            { type: "p", inner: 'عرض محصول در واحد سانتی متر.' }
                                        ],
                                    },
                                ]
                            },
                            { // height
                                type: 'tg',
                                title: '$F$ height',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "height of product in cm" },
                                            { type: "p", inner: 'ارتفاع محصول در واحد سانتی متر.' }
                                        ],
                                    },
                                ]
                            },
                            { // weight
                                type: 'tg',
                                title: '$F$ weight',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "weight of product in grams" },
                                            { type: "p", inner: 'ورن محصول در واحد گرم.' }
                                        ],
                                    },
                                ]
                            },
                        ]
                    },
                    { // price_id
                        type: 'tg',
                        title: '$F$ price_id',
                        inner: [
                            {
                                type: 'bl',
                                inner: "ObjectId",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    'id of price that attached to this product',
                                    'آیدی مدل قیمت(price) که به این محصول وصل شده.'
                                ],
                            },
                        ]
                    },
                    { // price
                        type: 'tg',
                        title: '$V$ price',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Virtual(Relation)",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    'price that attached to this product',
                                    'اطلاعات مدل قیمت(price) که به این محصول وصل شده.',
                                ],
                            },
                            {
                                type: 'bl',
                                inner: {
                                    type: 'a',
                                    link: 'PricePage',
                                    inner: 'Price Model',
                                },
                            }
                        ]
                    },
                    { // has_media_gallery
                        type: 'tg',
                        title: '$F$ has_media_gallery',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Boolean",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "indicate this mix_variant has its own media gallery or not." },
                                    { type: "p", inner: 'مشخص می کند که این "mix_variant" گالری تصویر خودش را دارد یا باید از گالری تصاویر خود محصول استفاده شود.' }
                                ],
                            },
                        ]
                    },
                    { // media
                        type: 'tg',
                        title: '$F$$EO$ media',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Embedded Object",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    'main media of "media_gallery"',
                                    'تصویر اصلی محصول. این تصویریکی از تصاویر "image_gallery" است که به عنوان تصویر اصلی انتخاب شده است.'
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
                    {// media_gallery
                        type: 'tg',
                        title: '$F$$A$$EO$ media_gallery',
                        inner: [
                            {
                                type: 'bl',
                                inner: "array of embedded object",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    'media gallery of this "mix_variant""',
                                    'گالری تصاویر این "mix_variant"',
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
                                title: '$F$ sort',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Int",
                                    },
                                    {
                                        type: 'bl',
                                        inner: 'images must be sorted by this number',
                                    },
                                ]
                            },
                            {
                                type: 'tg',
                                title: '$F$ is_main',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Boolean",
                                    },
                                    {
                                        type: 'bl',
                                        inner: 'indicate main media of gallery,just one of images is main',
                                    },
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
            { // collections
                type: 'tg',
                title: '$EO$$F$ collections',
                inner: [
                    {
                        type: 'bl',
                        inner: "Embedded Object",
                    },
                    { // related_products
                        type: 'tg',
                        title: '$EO$$F$ related_products',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Embedded Object",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "list of prodcuts that flaged as related to this product" },
                                    { type: "p", inner: "لیست محصولاتی که به عنوان محصول مرتبط مشخص شده اند." },
                                ],
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: "to get list of related product use \"@helpers/CollectionHelper/get_rpoducts\" " },
                                    { type: "p", inner: "برای گرفتن لیست محصولات مرتبط از \"@helpers/CollectionHelper/get_rpoducts\" استفاده کنید." },
                                ],
                            },
                            { // collection_type
                                type: 'tg',
                                title: '$F$ collection_type',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "Enum: {'static': 1,'dynamic': 2}",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'type of collection' },
                                            { type: "p", inner: 'نوع کالکشن.', },
                                        ],
                                    },
                                ]
                            },
                            { // collection_id
                                type: 'tg',
                                title: '$F$ collection_id',
                                inner: [
                                    {
                                        type: 'bl',
                                        inner: "ObjectId",
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: 'id of collection' },
                                            { type: "p", inner: 'آیدی کالکشن.', },
                                        ],
                                    },
                                    {
                                        type: 'bl',
                                        inner: [
                                            { type: "p", inner: "to get list of related product use \"@helpers/CollectionHelper/get_rpoducts\" " },
                                            { type: "p", inner: "برای گرفتن لیست محصولات مرتبط از \"@helpers/CollectionHelper/get_rpoducts\" استفاده کنید." },
                                        ],
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            { // toturials
                type: 'tg',
                title: '$A$$EO$$F$ toturials',
                inner: [
                    {
                        type: 'bl',
                        inner: "Array of Embedded Object",
                    },
                    { // file_key
                        type: 'tg',
                        title: '$F$ file_key',
                        inner: [
                            {
                                type: 'bl',
                                inner: "String",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'key of toturial files' },
                                    { type: "p", inner: 'کلید یکتا فایل آموزش.', },
                                ],
                            },
                        ]
                    },
                    { // title
                        type: 'tg',
                        title: '$F$ title',
                        inner: [
                            {
                                type: 'bl',
                                inner: "Multi Language",
                            },
                            {
                                type: 'bl',
                                inner: [
                                    { type: "p", inner: 'title of toturial' },
                                    { type: "p", inner: 'عنوان آموزش.', },
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
                        inner: 'Date and time that product created',
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
                        inner: 'Date and time that product updated',
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
            { type: 'bl', inner: "$V$ price" },
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
            { // type
                type: 'tg',
                title: '$F$ type',
                inner: [
                    {
                        type: 'bl',
                        inner: "Enum: {'product': 1,'download': 2,'service': 3,'preview': 4}",
                    },
                    {
                        type: 'bl',
                        inner: 'filter prodcut by its type',
                    },
                    {
                        type: 'bl',
                        inner: 'محصولات را طبق "type" فیلتر می کند.',
                    },
                ]
            },
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
                        inner: 'search in title, summary field',
                    },
                    {
                        type: 'bl',
                        inner: 'جهت جست و جو در عنوان و خلاصه',
                    },
                ]
            },
            { // category_ids
                type: 'tg',
                title: '$A$ category_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'filter products by category ids',
                    },
                    {
                        type: 'bl',
                        inner: 'returns products that attached to one of those category ids',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس دسته بندی های متصل به محصولات',
                    },
                    {
                        type: 'bl',
                        inner: 'در صورتی که چند دسته بندی انتخاب شده بود، محصولاتی نمایش داده شود که حداقل به یکی از این دسته بندی ها متصل شده باشد.',
                    },
                ]
            },
            { // tag_ids
                type: 'tg',
                title: '$A$ tag_ids',
                inner: [
                    {
                        type: 'bl',
                        inner: "array of ObjectId",
                    },
                    {
                        type: 'bl',
                        inner: 'filter products by tag_ids and tag_group_ids fields',
                    },
                    {
                        type: 'bl',
                        inner: 'returns products that has one of the tag_ids or has tag_group_id that has one of tag_ids',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس تگ های متصل به محصولات',
                    },
                    {
                        type: 'bl',
                        inner: 'دقت داشته باشید که تگ ها غیر از اینکه به صورت مستقیم به محصول متصل می شوند، می توانند از طریق گروه تگ هم متصل شوند.',
                    },
                    {
                        type: 'bl',
                        inner: 'در صورتی که چند تگ انتخاب شده بود، محصولاتی نمایش داده شود که به یکی از این تگ ها متصل شده باشد.',
                    },
                ]
            },
            { // price_min
                type: 'tg',
                title: '$V$ price_min',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: 'filter products by price',
                    },
                    {
                        type: 'bl',
                        inner: 'returns products that those prices is more than "price_min"',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس قیمت محصولات',
                    },
                    {
                        type: 'bl',
                        inner: 'محصولاتی که قیمت آن ها بیشتر از "price_min" باشد نمایش داده مشوند.',
                    },
                ]
            },
            { // price_max
                type: 'tg',
                title: '$V$ price_max',
                inner: [
                    {
                        type: 'bl',
                        inner: "Int",
                    },
                    {
                        type: 'bl',
                        inner: 'filter products by price',
                    },
                    {
                        type: 'bl',
                        inner: 'returns products that those prices is less than "price_max"',
                    },
                    {
                        type: 'bl',
                        inner: 'فیلتر بر اساس قیمت محصولات',
                    },
                    {
                        type: 'bl',
                        inner: 'محصولاتی که قیمت آن ها کمتر از "price_max" باشد نمایش داده مشوند.',
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
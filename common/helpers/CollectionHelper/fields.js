const { CollectionModel, ProductModel } = require('../../models');
const wheres_operators = CollectionModel.wheres_operators;

const product_details_count_unit = ProductModel.details_count_units;

const value_types = {
    text: 1,
    array_text: 2,
    ml_text: 3,
    array_ml_text: 4,
    number: 5,
    array_number: 6,
    date: 7,
    bool: 8,
    select_box: 9,
    multi_select_box: 10,
};

// const fields = {
//     title: 'ml',
//     summary: 'ml',
//     description: 'ml',
//     strengths: ['ml'],
//     weaknesses: ['ml'],
//     main_features: ['ml'],
//     status: 'enum',
//     publishAt: 'Date',
//     has_rating: 'bool',
//     is_special: 'bool',
//     type: 'enum',
//     category_id: 'id',
//     brand_id: 'id',

//     tag_ids: ['id'],
//     tag_group_id: 'id',
//     has_variant: 'bool',
//     user_id: 'id',
//     createdAt: 'Date',
//     updatedAt: 'Date',

//     // seo fields
//     seo_title: 'ml',
//     seo_description: 'ml',
//     seo_keywords: 'ml',
//     seo_url: 'string',
//     seo_canonical_url: 'string',
//     seo_redirect_301: 'string',
//     seo_redirect_404: 'string',

//     // mix variant fields
//     // keys: ['string'],
//     mix_variant_is_main_price: 'bool',
//     mix_variant_is_active: 'bool',
//     // mix_variant_sort: 'number',

//     mix_variant_details_warehouse: 'string',
//     mix_variant_details_product_code: 'string',
//     mix_variant_details_use_count: 'bool',
//     mix_variant_details_count: 'number',
//     mix_variant_details_count_status: 'enum',
//     mix_variant_details_count_unit: 'enum',
//     mix_variant_details_limit_min: 'number',
//     mix_variant_details_limit_max: 'number',
//     mix_variant_details_length: 'number',
//     mix_variant_details_width: 'number',
//     mix_variant_details_height: 'number',
//     mix_variant_details_weight: 'number',

//     mix_variant_price_price: 'number',
//     mix_variant_price_offer_price: 'number',
//     mix_variant_price_offer_startAt: 'Date',
//     mix_variant_price_offer_expireAt: 'Date',
//     mix_variant_price_discount_percent: 'number',
// };

module.exports = [
    {
        key: 'title',
        title: { // todo: get text from trans helper
            "fa": "عنوان",
            "en": "title"
        },
        query_path: 'title',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'summary',
        title: {
            "fa": "خلاصه",
            "en": "summary"
        },
        query_path: 'summary',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'description',
        title: {
            "fa": "توضیحات",
            "en": "description"
        },
        query_path: 'description',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'strengths',
        title: {
            "fa": "نقاط قوت",
            "en": "strengths"
        },
        query_path: 'strengths',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.includes,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'weaknesses',
        title: {
            "fa": "نقاط ضعف",
            "en": "weaknesses"
        },
        query_path: 'weaknesses',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.includes,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'main_features',
        title: {
            "fa": "ویژگی های اصلی",
            "en": "main_features"
        },
        query_path: 'main_features',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.includes,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'status',
        title: {
            "fa": "وضعیت",
            "en": "status",
        },
        query_path: 'status',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: [
                    // todo: import from product model
                    // todo: set as dynamic value
                    {
                        key: 1,
                        title: {
                            fa: "غیر فعال",
                            en: "inactive",
                        }
                    },
                    {
                        key: 2,
                        title: {
                            fa: "نمایش",
                            en: "show",
                        }
                    },
                    {
                        key: 3,
                        title: {
                            fa: "پیش نمایش",
                            en: "draft",
                        }
                    },
                ],
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: [
                    {
                        key: 1,
                        title: {
                            fa: "غیر فعال",
                            en: "inactive",
                        }
                    },
                    {
                        key: 2,
                        title: {
                            fa: "نمایش",
                            en: "show",
                        }
                    },
                    {
                        key: 3,
                        title: {
                            fa: "پیش نمایش",
                            en: "draft",
                        }
                    },
                ],
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: [
            //         {
            //             key: 1,
            //             title: {
            //                 fa: "غیر فعال",
            //                 en: "inactive",
            //             }
            //         },
            //         {
            //             key: 2,
            //             title: {
            //                 fa: "نمایش",
            //                 en: "show",
            //             }
            //         },
            //         {
            //             key: 3,
            //             title: {
            //                 fa: "پیش نمایش",
            //                 en: "draft",
            //             }
            //         },
            //     ],
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'publishAt',
        title: {
            "fa": "تاریخ انتشار",
            "en": "publishAt",
        },
        query_path: 'publishAt',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'has_rating',
        title: {
            "fa": "امتیازگذاری",
            "en": "has_rating",
        },
        query_path: 'has_rating',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'is_special',
        title: {
            "fa": "ویژه بودن",
            "en": "is_special",
        },
        query_path: 'is_special',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'type',
        title: {
            "fa": "نوع",
            "en": "type"
        },
        query_path: 'type',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: [
                    // todo: import from product model
                    {
                        key: 1,
                        title: {
                            fa: "محصول فیزیکی",
                            en: "product",
                        }
                    },
                    {
                        key: 2,
                        title: {
                            fa: "دانلود",
                            en: "download",
                        }
                    },
                    {
                        key: 3,
                        title: {
                            fa: "سرویس",
                            en: "service",
                        }
                    },
                    {
                        key: 4,
                        title: {
                            fa: "پیش نمایش",
                            en: "preview",
                        }
                    },
                ],
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: [
                    {
                        key: 1,
                        title: {
                            fa: "محصول فیزیکی",
                            en: "product",
                        }
                    },
                    {
                        key: 2,
                        title: {
                            fa: "دانلود",
                            en: "download",
                        }
                    },
                    {
                        key: 3,
                        title: {
                            fa: "سرویس",
                            en: "service",
                        }
                    },
                    {
                        key: 4,
                        title: {
                            fa: "پیش نمایش",
                            en: "preview",
                        }
                    },
                ],
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: [
            //         {
            //             key: 1,
            //             title: {
            //                 fa: "محصول فیزیکی",
            //                 en: "product",
            //             }
            //         },
            //         {
            //             key: 2,
            //             title: {
            //                 fa: "دانلود",
            //                 en: "download",
            //             }
            //         },
            //         {
            //             key: 3,
            //             title: {
            //                 fa: "سرویس",
            //                 en: "service",
            //             }
            //         },
            //         {
            //             key: 4,
            //             title: {
            //                 fa: "پیش نمایش",
            //                 en: "preview",
            //             }
            //         },
            //     ],
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'category_id',
        title: {
            "fa": "دسته بندی",
            "en": "category_id"
        },
        query_path: 'category_id',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'categories',

            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'categories',
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: [],
            //     dynamic_values: 'categories',
            // },
        ],
    },
    {
        key: 'brand_id',
        title: {
            "fa": "برند",
            "en": "brand_id"
        },
        query_path: 'brand_id',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'brands',
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'brands',
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: [],
            //     dynamic_values: 'brands',
            // },
        ],
    },
    {
        key: 'tag_ids',
        title: {
            "fa": "تگ ها",
            "en": "tag_ids"
        },
        query_path: 'tag_ids',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            { // todo: add "all" operator
                operation_type: wheres_operators.includes,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'tags',
            },
        ],
    },
    {
        key: 'tag_group_id',
        title: {
            "fa": "گروه تگ",
            "en": "tag_group_id"
        },
        query_path: 'tag_group_id',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'tag_groups',
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: [],
                dynamic_values: 'tag_groups',
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: [],
            //     dynamic_values: 'tag_groups',
            // },
        ],
    },
    {
        key: 'has_variant',
        title: {
            "fa": "گونه دارد",
            "en": "has_variant",
        },
        query_path: 'has_variant',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    // {
    //     key: 'user_id',
    //     title: {
    //         "fa": "کاربر",
    //         "en": "user_id"
    //     },
    //     query_path: 'user_id',
    //     is_in_mix_variant: false,
    //     is_multi_language: false,
    //     operators: [
    //         {
    //             operation_type: wheres_operators.equal,
    //             value_type: value_types.select_box,
    //             values: [] // todo: add list of users here
    //             dynamic_values: null,
    //         },
    //         {
    //             operation_type: wheres_operators.not_equal,
    //             value_type: value_types.select_box,
    //             values: [] // todo: add list of users here
    //             dynamic_values: null,
    //         },
    //         {
    //             operation_type: wheres_operators.in,
    //             value_type: value_types.multi_select_box,
    //             values: [] // todo: add list of users here
    //             dynamic_values: null,
    //         },
    //     ],
    // },
    {
        key: 'createdAt',
        title: {
            "fa": "تاریخ ساخته شدن",
            "en": "createdAt",
        },
        query_path: 'createdAt',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'updatedAt',
        title: {
            "fa": "تاریخ ساخته شدن",
            "en": "updatedAt",
        },
        query_path: 'updatedAt',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
        ],
    },

    // seo fields
    {
        key: 'seo_title',
        title: {
            "fa": "عنوان سئو",
            "en": "seo_title"
        },
        query_path: 'seo.title',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_description',
        title: {
            "fa": "توضیحات سئو",
            "en": "seo_description"
        },
        query_path: 'seo.description',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_keywords',
        title: {
            "fa": "کلمات کلیدی سئو",
            "en": "seo_keywords"
        },
        query_path: 'seo.keywords',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_keywords',
        title: {
            "fa": "کلمات کلیدی سئو",
            "en": "seo_keywords"
        },
        query_path: 'seo.keywords',
        is_in_mix_variant: false,
        is_multi_language: true,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.ml_text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_ml_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_url',
        title: {
            "fa": "لینک سئو",
            "en": "seo_url"
        },
        query_path: 'seo.url',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_canonical_url',
        title: {
            "fa": "لینک کانونیکال سئو",
            "en": "seo_canonical_url"
        },
        query_path: 'seo.canonical_url',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_redirect_301',
        title: {
            "fa": "لینک ریدارکت ۳۰۱ سئو",
            "en": "seo_redirect_301"
        },
        query_path: 'seo.redirect_301',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'seo_redirect_404',
        title: {
            "fa": "لینک ریدارکت ۴۰۴ سئو",
            "en": "seo_redirect_404"
        },
        query_path: 'seo.redirect_404',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },

    // mix variant fields

    {
        key: 'mix_variant_is_main_price',
        title: {
            "fa": "فیمت اصلی است؟",
            "en": "is main price",
        },
        query_path: 'is_main_price',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'mix_variant_is_active',
        title: {
            "fa": "فعال است",
            "en": "is active",
        },
        query_path: 'ia_active',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'mix_variant_details_warehouse',
        title: {
            "fa": "مکان انبار",
            "en": "warehouse"
        },
        query_path: 'details.warehouse',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_product_code',
        title: {
            "fa": "کد کالا",
            "en": "product_code"
        },
        query_path: 'details.product_code',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.regex,
                value_type: value_types.text,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_text,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_use_count',
        title: {
            "fa": "استفاده از تعداد",
            "en": "use count",
        },
        query_path: 'details.use_count',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.bool,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'mix_variant_details_count',
        title: {
            "fa": "تعداد",
            "en": "count",
        },
        query_path: 'details.count',
        is_in_mix_variant: false,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_count_status',
        title: {
            "fa": "وضعیت تعداد",
            "en": "count_status"
        },
        query_path: 'details.count_status',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: [
                    // todo: import from product model
                    {
                        key: 1,
                        title: {
                            fa: "موجود",
                            en: "available",
                        }
                    },
                    {
                        key: 2,
                        title: {
                            fa: "برای اطلاع از قیمت تماس بگیرید",
                            en: "contact for price",
                        }
                    },
                    {
                        key: 3,
                        title: {
                            fa: "بزودی",
                            en: "coming soon",
                        }
                    },
                    {
                        key: 4,
                        title: {
                            fa: "موجود نیست",
                            en: "not available",
                        }
                    },
                    {
                        key: 5,
                        title: {
                            fa: "پایان تولید",
                            en: "end of production",
                        }
                    },
                    {
                        key: 6,
                        title: {
                            fa: "نوسان قیمت",
                            en: "price_fluctuation",
                        }
                    },
                ],
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: [
                    {
                        key: 1,
                        title: {
                            fa: "موجود",
                            en: "available",
                        }
                    },
                    {
                        key: 2,
                        title: {
                            fa: "برای اطلاع از قیمت تماس بگیرید",
                            en: "contact for price",
                        }
                    },
                    {
                        key: 3,
                        title: {
                            fa: "بزودی",
                            en: "coming soon",
                        }
                    },
                    {
                        key: 4,
                        title: {
                            fa: "موجود نیست",
                            en: "not available",
                        }
                    },
                    {
                        key: 5,
                        title: {
                            fa: "پایان تولید",
                            en: "end of production",
                        }
                    },
                    {
                        key: 6,
                        title: {
                            fa: "نوسان قیمت",
                            en: "price_fluctuation",
                        }
                    },
                ],
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: [
            //         {
            //             key: 1,
            //             title: {
            //                 fa: "موجود",
            //                 en: "available",
            //             }
            //         },
            //         {
            //             key: 2,
            //             title: {
            //                 fa: "برای اطلاع از قیمت تماس بگیرید",
            //                 en: "contact for price",
            //             }
            //         },
            //         {
            //             key: 3,
            //             title: {
            //                 fa: "بزودی",
            //                 en: "coming soon",
            //             }
            //         },
            //         {
            //             key: 4,
            //             title: {
            //                 fa: "موجود نیست",
            //                 en: "not available",
            //             }
            //         },
            //         {
            //             key: 5,
            //             title: {
            //                 fa: "پایان تولید",
            //                 en: "end of production",
            //             }
            //         },
            //         {
            //             key: 6,
            //             title: {
            //                 fa: "نوسان قیمت",
            //                 en: "price_fluctuation",
            //             }
            //         },
            //     ],
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_count_unit',
        title: {
            "fa": "واحد تعداد",
            "en": "count unit"
        },
        query_path: 'details.count_unit',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.select_box,
                values: product_details_count_unit,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.select_box,
                values: product_details_count_unit,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.multi_select_box,
            //     values: product_details_count_unit,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_limit_min',
        title: {
            "fa": "تعداد حداقل",
            "en": "limit min",
        },
        query_path: 'details.limit_min',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_limit_max',
        title: {
            "fa": "تعداد حداکثر",
            "en": "limit max",
        },
        query_path: 'details.limit_max',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_length',
        title: {
            "fa": "طول",
            "en": "length",
        },
        query_path: 'details.length',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_width',
        title: {
            "fa": "عرض",
            "en": "width",
        },
        query_path: 'details.width',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_height',
        title: {
            "fa": "ارتفاع",
            "en": "height",
        },
        query_path: 'details.height',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_details_weight',
        title: {
            "fa": "وزن",
            "en": "weight",
        },
        query_path: 'details.weight',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    // price
    {
        key: 'mix_variant_price_main_price',
        title: {
            "fa": "قیمت اصلی",
            "en": "main price",
        },
        query_path: 'price.main_price',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_price_price',
        title: {
            "fa": "قیمت بدون تخفیف",
            "en": "price without discount",
        },
        query_path: 'price.price',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_price_offer_price',
        title: {
            "fa": "قیمت تخفیف دار",
            "en": "offer_price",
        },
        query_path: 'price.offer_price',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
    {
        key: 'mix_variant_price_offer_startAt',
        title: {
            "fa": "تاریخ شروع تخفیف",
            "en": "offer_startAt",
        },
        query_path: 'price.offer_startAt',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
        ],
    },

    {
        key: 'mix_variant_price_offer_expireAt',
        title: {
            "fa": "تاریخ پایان تخفیف",
            "en": "offer_expireAt",
        },
        query_path: 'price.offer_expireAt',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.date,
                values: null,
                dynamic_values: null,
            },
        ],
    },
    {
        key: 'mix_variant_price_discount_percent',
        title: {
            "fa": "درصد تخفیف",
            "en": "offer_discount_percent",
        },
        query_path: 'price.discount_percent',
        is_in_mix_variant: true,
        is_multi_language: false,
        operators: [
            {
                operation_type: wheres_operators.less_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.less_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.not_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            {
                operation_type: wheres_operators.more_than_or_equal,
                value_type: value_types.number,
                values: null,
                dynamic_values: null,
            },
            // {
            //     operation_type: wheres_operators.in,
            //     value_type: value_types.array_number,
            //     values: null,
            //     dynamic_values: null,
            // },
        ],
    },
];
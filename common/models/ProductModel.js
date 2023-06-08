const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statuses = {
    'inactive': 1,
    'show': 2,
    'draft': 3,
};

const types = {
    'product': 1,
    'download': 2,
    'service': 3,
    'preview': 4,
};

const variant_types = {
    'text': 1,
    'color': 2,
    'image': 3,
    // 'file': 4,
};

const details_count_statuses = {
    'available': 1,
    'contact_for_price': 2,
    'coming_soon': 3,
    'not_available': 4,
    'end_of_production': 5,
    'price_fluctuation': 6,
};

const services_api_config_types = {
    'rest': 1,
    'graphql': 2,
};

const details_count_units = [
    {
        title: {
            "fa": "عدد",
            "en": "number",
        },
        key: 1,
    },
    {
        title: {
            "fa": "کیلو گرم",
            "en": "kilograms",
        },
        key: 2,
    },
    {
        title: {
            "fa": "گرم",
            "en": "grams",
        },
        key: 3,
    },
    {
        title: {
            "fa": "بسته",
            "en": "boxes",
        },
        key: 4,
    },
    {
        title: {
            "fa": "جعبه",
            "en": "boxes",
        },
        key: 5,
    },
    {
        title: {
            "fa": "کارتن",
            "en": "boxes",
        },
        key: 6,
    },
    {
        title: {
            "fa": "متر",
            "en": "meters",
        },
        key: 7,
    },
    {
        title: {
            "fa": "سانتیمتر",
            "en": "centimeters",
        },
        key: 8,
    },
    {
        title: {
            "fa": "میلیمتر",
            "en": "millimeters",
        },
        key: 9,
    },
    {
        title: {
            "fa": "قطعه",
            "en": "Pieces",
        },
        key: 10,
    },
    {
        title: {
            "fa": "متر مربع",
            "en": "square meter",
        },
        key: 11,
    },
    {
        title: {
            "fa": "دستگاه",
            "en": "devices",
        },
        key: 12,
    },
    {
        title: {
            "fa": "لیتر",
            "en": "litter",
        },
        key: 13,
    },
    {
        title: {
            "fa": "جلد",
            "en": "volumes",
        },
        key: 14,
    },
    {
        title: {
            "fa": "تن",
            "en": "tons",
        },
        key: 15,
    },
    {
        title: {
            "fa": "سی سی",
            "en": "cc",
        },
        key: 16,
    },
    {
        title: {
            "fa": "نفر",
            "en": "peoples",
        },
        key: 17,
    },
    {
        title: {
            "fa": "تخته",
            "en": "boards",
        },
        key: 18,
    },
    {
        title: {
            "fa": "رول",
            "en": "rolls",
        },
        key: 19,
    },
    {
        title: {
            "fa": "جفت",
            "en": "pairs",
        },
        key: 20,
    },
    {
        title: {
            "fa": "یارد",
            "en": "yards",
        },
        key: 21,
    },
    {
        title: {
            "fa": "دسته",
            "en": "groups",
        },
        key: 22,
    },
    {
        title: {
            "fa": "شاخه",
            "en": "branches",
        },
        key: 23,
    },
    {
        title: {
            "fa": "ست",
            "en": "sets",
        },
        key: 24,
    },
];

const mix_variant_schema = Schema(
    {
        keys: [String],
        is_main_price: Boolean,
        is_active: Boolean,
        sort: Number,
        details: {
            warehouse: String,
            product_code: String,
            use_count: Boolean,
            count: Number,
            count_status: Number,
            count_unit: Number,
            limit_min: Number,
            limit_max: Number,
            length: Number, // cm
            width: Number, // cm
            height: Number, // cm
            weight: Number, // grams
        },
        price_id: {
            type: Schema.Types.ObjectId,
            ref: "PriceModel"
        },
        has_media_gallery: Boolean,
        media: {
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            alt: String,
            url: String,
        },
        media_gallery: [{
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            sort: Number,
            main: Boolean,
            alt: String,
            url: String,
        }],
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

mix_variant_schema.virtual('price', {
    ref: 'PriceModel',
    localField: 'price_id',
    foreignField: '_id',
    justOne: true,
});

const schema = Schema(
    {
        title: {},
        summary: {},
        description: {},
        strengths: [{}], // multi language
        weaknesses: [{}], // multi language
        main_features: [{}], // multi language
        status: Number,
        publishAt: Date,
        has_rating: Boolean,
        has_comment: Boolean,
        is_special: Boolean,
        only_description: Boolean,
        show_price: Boolean,
        type: Number,
        // details: {},
        // price_id: {
        //     type: Schema.Types.ObjectId,
        //     ref: "PriceModel"
        // },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: "CategoryModel"
        },
        brand_id: {
            type: Schema.Types.ObjectId,
            ref: "BrandModel"
        },
        media: {
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            alt: String,
            url: String,
        },
        media_gallery: [{
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            sort: Number,
            main: Boolean,
            alt: String,
            url: String,
        }],
        video: {
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            alt: String,
            url: String,
        },
        files: [{
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            alt: String,
            url: String,
        }],
        seo_id: {
            type: Schema.Types.ObjectId,
            ref: "SEOModel"
        },
        tag_ids: [{
            type: Schema.Types.ObjectId,
            ref: "TagModel"
        }],
        tag_group_id: {
            type: Schema.Types.ObjectId,
            ref: "TagModel"
        },

        attribute_variant_id: {
            type: Schema.Types.ObjectId,
            ref: "AttributeModel"
        },
        attribute_groups: [{
            attribute_group_id: {
                type: Schema.Types.ObjectId,
                ref: "AttributeModel"
            },
            attributes: [{
                attribute_id: {
                    type: Schema.Types.ObjectId,
                    ref: "AttributeModel"
                },
                attribute_value_id: {
                    type: Schema.Types.ObjectId,
                    ref: "AttributeValueModel"
                },
            }]
        }],
        has_variant: Boolean,
        variant: [{
            name: {},
            type: { type: Number },
            labels: [{
                key: String,
                title: JSON, // multi language
                values: {},
            }]
        }],
        mix_variant: [mix_variant_schema],
        collections: {
            related_products: {
                collection_type: Number,
                collection_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'CollectionModel'
                }
            },
        },
        services: {
            api_config: {
                type: Number,
                app_key: String,
                url: String,
                mutation: String,
            }
        },
        tutorials: [{
            file_key: String,
            title: {}, // multi language
            user_access_ids: [{
                type: Schema.Types.ObjectId,
                ref: "UserModel"
            }]
        }],
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'products',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.statics.statuses = statuses;
schema.statics.types = types;
schema.statics.variant_types = variant_types;
schema.statics.details_count_statuses = details_count_statuses;
schema.statics.services_api_config_types = services_api_config_types;
schema.statics.details_count_units = details_count_units;

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

schema.virtual('seo', {
    ref: 'SEOModel',
    localField: 'seo_id',
    foreignField: '_id',
    justOne: true,
});

const ProductModel =
    mongoose.models.ProductModel || mongoose.model('ProductModel', schema);

module.exports = {
    types,
    statuses,
    variant_types,
    details_count_statuses,
    services_api_config_types,
    details_count_units,
    ProductModel,
};
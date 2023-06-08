const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const types = {
    'static': 1,
    'dynamic': 2,
};

const sources = {
    'campaign': 1,
    'bag': 2,
    'gift': 3,
    'related_product': 4,
};

const orders_types = {
    'asc': 1,
    'desc': 2,
};

const logics = {
    'and': 1,
    'or': 2,
};

const wheres_operators = {
    // number operators
    'less_than': 1,
    'less_than_or_equal': 2,
    'equal': 3,
    'not_equal': 4,
    'more_than': 5,
    'more_than_or_equal': 6,

    'in': 7,
    // string operators
    'regex': 8,

    // array operators
    'includes': 10, // حداقل شامل یکی از موارد باشد
    'all': 11, // دقیقا شامل همه موارد باشد
};

const cover_positions = {
    'up': 1,
    'up-right': 2,
    'up-left': 3,
    'down': 4,
    'down-right': 5,
    'down-left': 6,
    'right': 7,
    'left': 8,
};


const schema = Schema(
    {
        type: Number, // static or dynamic

        // dynamic fields:
        condition: {
            model_name: String,
            limit: Number,
            logic: Number, // "and", "or"
            orders: [
                {
                    type: Number, // "asc", "desc"
                    field: String
                }
            ],
            wheres: [
                {
                    operator: Number,
                    where_field: String,
                    where_value: {},
                }
            ]
        },

        // static fields:
        list: [{
            product_id: {
                type: Schema.Types.ObjectId,
                ref: "ProductModel",
            },
            has_variant_key: Boolean,
            mix_variant_keys: [String],
            sort: Number,
            price_id: {
                type: Schema.Types.ObjectId,
                ref: "PriceModel",
            },
            show: Boolean,
            expireAt: Date,
        }],

        extra_fields: {
            title: {}, // multi language
            description: {}, // multi language
            show: Boolean,
            seo_id: {
                type: Schema.Types.ObjectId,
                ref: "SEOModel",
            },
            media: {
                media_id: {
                    type: Schema.Types.ObjectId,
                    ref: "MediaModel"
                },
                alt: String,
                url: String,
            },
            score: Number,
            startAt: Date,
            expireAt: Date,
            has_timer: Boolean,
            cover: {
                media_id: {
                    type: Schema.Types.ObjectId,
                    ref: "MediaModel"
                },
                alt: String,
                url: String,
            },
            cover_position: Number,
        },

        source: Number,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

    },
    { collection: 'collections', timestamps: true }
);

schema.statics.cover_positions = cover_positions;
schema.statics.sources = sources;
schema.statics.types = types;
schema.statics.orders_types = orders_types;
schema.statics.logics = logics;
schema.statics.wheres_operators = wheres_operators;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const CollectionModel =
    mongoose.models.CollectionModel || mongoose.model('CollectionModel', schema);

module.exports = {
    cover_positions,
    sources,
    types,
    orders_types,
    logics,
    wheres_operators,
    CollectionModel,
};
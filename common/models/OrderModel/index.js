const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { calculate_sum, calculate_discount, calculate_post_price } = require('./statics');

const { Schema } = mongoose;

const types = {
    'cart': 1,
    'pre_order': 2,
    'complete': 3,
};

const send_withs = {
    'dont_send': 0,
    'sms': 1,
    'email': 2,
};

const statuses = {
    'not_set': 0,
    'reject': 1,
    'complete': 2,
    'pending': 3,
    'packing': 4,
    'sending': 5,
    'sent': 6
};

const schema = Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
        discount_id: {
            type: Schema.Types.ObjectId,
            ref: "DiscountModel"
        },
        transaction_id: {
            type: Schema.Types.ObjectId,
            ref: "TransactionModel"
        },
        address_id: {
            type: Schema.Types.ObjectId,
            ref: "AddressModel"
        },
        date: Date,
        number: String,
        total_prices: JSON,
        // weight: Number,
        post_track_code: String,
        shipping_method_id: { type: Schema.Types.ObjectId }, // use for post price 
        payment_gateway_id: String, // payment methods from setting
        type: Number,
        status: Number,
        is_inquiry: Number,
        note: String,
        products: [
            {
                product_id: {
                    type: Schema.Types.ObjectId,
                    ref: "ProductModel"
                },
                mix_variant_keys: [String],
                price_id: {
                    type: Schema.Types.ObjectId,
                    ref: "PriceModel"
                },
                count: Number,
                note: String,
            }
        ],
    },
    {
        collection: 'orders',
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

schema.virtual('calculate_sum').get(function () {
    return calculate_sum;
});
schema.virtual('calculate_discount').get(function () {
    return calculate_discount;
});
schema.virtual('calculate_post_price').get(function () {
    return calculate_post_price;
});

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const OrderModel =
    mongoose.models.OrderModel || mongoose.model('OrderModel', schema);

module.exports = {
    types,
    send_withs,
    statuses,
    OrderModel,
};
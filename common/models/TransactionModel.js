const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statuses = {
    'reject': 1,
    'not_verified': 2,
    'complete': 3,
};

const gateways = {
    'melat': 1,
}

const response_codes = {
    'empty': 0,
    'done': 1,
    'error': -1,
}

const schema = Schema(
    {
        sand_box: Boolean,
        status: Number,
        request_response: {},
        request_parsed_response: {
            code: Number,
            message: String,
        },
        callback_response: {},
        callback_parsed_response: {
            code: Number,
            message: String,
        },
        verify_response: {},
        verify_parsed_response: {
            code: Number,
            message: String,
        },
        gateway: Number,
        amount: Number,
        description: String,
        unique_number: Number,

        paidAt: Date,
        verifiedAt: Date,
        payment_url: String,

        tracking_code: String,
        credit_card: String,

        extra_fields: {},

        order_id: {
            type: Schema.Types.ObjectId,
            ref: "OrderModel",
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'transactions',
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
schema.statics.gateways = gateways;
schema.statics.response_codes = response_codes;

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const TransactionModel =
    mongoose.models.TransactionModel || mongoose.model('TransactionModel', schema);

module.exports = {
    statuses,
    gateways,
    response_codes,
    TransactionModel,
};
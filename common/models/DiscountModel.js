const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statuses = {
    'active': 1,
    'inactive': 2,
};

const types = {
    'percent': 1,
    'amount': 2,
};

const use_limit_types = {
    'user': 1,
    'code': 2,
};

const condition_types = {
    'factor': 1,
    'category': 2,
    'brand': 3,
    'campaign': 4,
};

const access_types = {
    'user': 1,
    'access': 2,
};

const schema = Schema(
    {
        title: {}, // multi language
        code: String,
        status: Number,
        type: { type: Number },
        value: Number,
        max_price: Number,
        min_price: Number,
        startAt: Date,
        expireAt: Date,
        settings: {
            use_limit: {
                type: { type: Number },
                count: Number,
            },
            condition: {
                type: { type: Number },
                values: [Schema.Types.ObjectId],
            },
            access: {
                type: { type: Number },
                values: [Schema.Types.ObjectId],
            }
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    { collection: 'discounts', timestamps: true }
);

schema.statics.statuses = statuses;
schema.statics.types = types;
schema.statics.use_limit_types = use_limit_types;
schema.statics.condition_types = condition_types;
schema.statics.access_types = access_types;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const DiscountModel =
    mongoose.models.DiscountModel || mongoose.model('DiscountModel', schema);

module.exports = {
    statuses,
    types,
    use_limit_types,
    condition_types,
    access_types,
    DiscountModel,
};
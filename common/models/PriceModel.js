const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const Float = require('mongoose-float').loadType(mongoose);

const { Schema } = mongoose;

const types = {
    'normal': 1,
    'bag': 2,
}

const schema = Schema(
    {
        type: Number,
        price: Number,
        offer_price: Number,
        offer_startAt: Date,
        offer_expireAt: Date,
        discount_percent: Float,

        model_name: String,
        model_id: Schema.Types.ObjectId,
        model_variant_keys: [String],
    },
    {
        collection: 'prices',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

const has_offer_price = (offer_price, offer_startAt, offer_expireAt) => {
    try { offer_price = parseFloat(offer_price); }
    catch { offer_price = 0; }
    try {
        if (!(offer_startAt instanceof Date))
            offer_startAt = new Date(parseInt(offer_startAt));
        if (isNaN(offer_startAt.getTime())) offer_startAt = null;
    }
    catch { offer_startAt = null; }
    try {
        if (!(offer_expireAt instanceof Date))
            offer_expireAt = new Date(parseInt(offer_expireAt));
        if (isNaN(offer_expireAt.getTime())) offer_expireAt = null;
    }
    catch { offer_expireAt = null; }

    if (offer_price > 0) {
        if ((offer_startAt && offer_startAt.getTime() < Date.now()) || !offer_startAt) {
            if ((offer_expireAt && offer_expireAt.getTime() > Date.now()) || !offer_expireAt) {
                return true;
            }
        }
    }
    return false;
};

// schema.virtual('real_discount_percent').get(function () {
//     if (has_offer_price(this.offer_price, this.offer_startAt, this.offer_expireAt))
//         return Math.floor((1 - (this.offer_price / this.price)) * 100);
//     return 0;
// });
schema.virtual('has_offer').get(function () {
    return has_offer_price(this.offer_price, this.offer_startAt, this.offer_expireAt);
});
schema.virtual('main_price').get(function () {
    if (has_offer_price(this.offer_price, this.offer_startAt, this.offer_expireAt))
        return this.offer_price;
    return this.price;
});
schema.virtual('old_price').get(function () {
    if (has_offer_price(this.offer_price, this.offer_startAt, this.offer_expireAt))
        return this.price;
    return 0;
});

schema.statics.types = types;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const PriceModel =
    mongoose.models.PriceModel || mongoose.model('PriceModel', schema);

module.exports = {
    types,
    PriceModel
};
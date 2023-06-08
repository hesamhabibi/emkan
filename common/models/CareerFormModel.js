const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const types = {
    text: 1,
    big_text: 2,
    select: 3,
    date: 4,
    media: 5,
    file: 6,
};

const schema = Schema(
    {
        user_name: String,
        user_last_name: String,
        user_email: String,
        user_mobile: String,
        fields: [{
            name: String,
            title: String,
            type: { type: Number },
            size: Number,
            value: {},
        }],
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'career_forms',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.statics.types = types

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const CareerFormModel = mongoose.models.CareerFormModel || mongoose.model('CareerFormModel', schema);

module.exports = {
    types,
    CareerFormModel,
};
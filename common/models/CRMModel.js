const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const types = {
    sms: 1,
    email: 2,
    push_notification: 3,
    popup: 4,
    internal_message: 5,
    external_message: 6,
};

const statuses = {
    pending: 1,
    success: 2,
    reject: 3,
};

const schema = Schema(
    {
        title: String,
        message: String,
        link: String,
        type: Number,
        kind: Number,
        send_to: [{
            receiver_user_id: {
                type: Schema.Types.ObjectId,
                ref: 'UserModel'
            },
            receiver_value: String,
            seen: Number,
        }],
        status: Number,
        date: Date,
        response: {},
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
        },
    },
    { collection: 'crms', timestamps: true }
);

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

schema.statics.types = types;
schema.statics.statuses = statuses;

const CRMModel =
    mongoose.models.CRMModel || mongoose.model('CRMModel', schema);
module.exports = {
    types,
    statuses,
    CRMModel,
};
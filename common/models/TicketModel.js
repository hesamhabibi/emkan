const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statuses = {
    'open': 1,
    'close': 2,
};

const departments = {
    'contact_us': 1,
};

const schema = Schema(
    {
        title: String,
        text: String,
        status: Number,
        department: Number,
        number: String,
        name: String, // name of user
        last_name: String,
        email: String,
        mobile: String,
        media: {
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            alt: String,
            url: String,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
        reply_to_id: {
            type: Schema.Types.ObjectId,
            ref: "TicketModel"
        },
    },
    {
        collection: 'tickets',
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
schema.statics.departments = departments;


schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const TicketModel = mongoose.models.TicketModel || mongoose.model('TicketModel', schema);

module.exports = {
    statuses,
    departments,
    TicketModel,
};
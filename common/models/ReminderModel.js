const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        title: String,
        description: String,
        start_date: Date,
        end_date: Date,
        access_user_ids: [{
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        }],
        type: Number,
        can_edit: Boolean,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
        },
    },
    { collection: 'reminders', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const ReminderModel =
    mongoose.models.ReminderModel || mongoose.model('ReminderModel', schema);
module.exports = {
    ReminderModel,
};
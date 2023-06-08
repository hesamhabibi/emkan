const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const types = {
    send_sms_array: 1,
    send_email_array: 2,
    send_push_notification_array: 3,
};

const schema = Schema(
    {
        type: Number,
        data: {},
        date: Date,
        done: Boolean,
    },
    { collection: 'tasks', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

schema.statics.types = types;

const TaskModel =
    mongoose.models.TaskModel || mongoose.model('TaskModel', schema);
module.exports = {
    types,
    TaskModel,
};
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const action_types = {
    'query': 1,
    'mutation': 2,
    'unknown': 3,
    'restful': 4,
};

const statuses = {
    'active': 1,
    'done': 2,
};

const departments = {
    'backend': 1,
    'frontend': 2,
    'web_api': 3,
};

const schema = Schema(
    {
        device_info: {},
        action: String,
        action_type: Number,
        parameters: {
            type: {},
            get: function (value) {
                if (typeof value == 'string')
                    try {
                        return JSON.parse(value);
                    } catch {
                        return value;
                    }
                return value;
            }
        },
        error: {
            type: {},
            get: function (value) {
                if (typeof value == 'string')
                    try {
                        return JSON.parse(value);
                    } catch {
                        return value;
                    }
                return value;
            }
        },
        response: {
            type: {},
            get: function (value) {
                if (typeof value == 'string')
                    try {
                        return JSON.parse(value);
                    } catch {
                        return value;
                    }
                return value;
            }
        },
        status_code: Number,
        status: Number,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
        department: Number,
    },
    { collection: 'reports', timestamps: true }
);

schema.statics.action_types = action_types;
schema.statics.statuses = statuses;
schema.statics.departments = departments;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const ReportModel = mongoose.models.ReportModel || mongoose.model('ReportModel', schema);

module.exports = {
    action_types,
    statuses,
    departments,
    ReportModel,
};
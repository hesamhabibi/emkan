const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const parsed_value = require('./parsed_value');
const extra_data = require('./extra_data');
const findByKey = require('./findByKey');

const { Schema } = mongoose;

const formats = {
    "object": 1,
    "array": 2,
    "string": 3,
    "big_text": 4,
    "text_editor": 4,
    "integer": 5,
    "bool": 6,
    "float": 7,
    "media": 8,
    "multilang": 9,
    "textarea_multilang": 10,
    "text_editor_multilang": 11,
};

const default_group = 'main';

const schema = new Schema(
    {
        name: {},
        key: String,
        group: { type: String, default: () => default_group },
        description: {},
        format: Number,
        is_main: Boolean,
        value: {},
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'settings',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

schema.virtual('parsed_value').get(parsed_value);
schema.virtual('extra_data').get(extra_data);

schema.statics.formats = formats;
schema.statics.findByKey = findByKey;
schema.statics.default_group = default_group;

const SettingModel =
    mongoose.models.SettingModel || mongoose.model('SettingModel', schema);

module.exports = {
    formats,
    default_group,
    findByKey,
    SettingModel
};
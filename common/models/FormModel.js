const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        title: {}, // multi language
        name: String,
        fields: [{
            label: {}, // multi language
            name: String,
            size: Number,
            default_value: {},
            data: [{
                name: {}, // multi language
                id: String,
            }],
            field_type_id: {
                type: Schema.Types.ObjectId,
                ref: "FieldTypeModel"
            },
            field_validation_ids: [{
                type: Schema.Types.ObjectId,
                ref: "FieldValidationModel"
            }]
        }],
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'UserModel',
        }
    },
    { collection: 'forms', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const FormModel =
    mongoose.models.FormModel || mongoose.model('FormModel', schema);

module.exports = {
    FormModel,
};
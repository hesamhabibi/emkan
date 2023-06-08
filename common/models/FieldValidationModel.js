const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        title: String,
        validation_rule: String,
    },
    { collection: 'field_validations', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const FieldValidationModel =
    mongoose.models.FieldValidationModel || mongoose.model('FieldValidationModel', schema);

module.exports = {
    FieldValidationModel,
};
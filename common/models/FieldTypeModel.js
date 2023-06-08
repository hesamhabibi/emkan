const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

// const field_types = {
//     'text': 1,
//     'toggle': 2,
//     'select': 3,
//     'select_searchable': 4,
//     'select_multiple': 5,
//     'date': 6,
//     'textarea': 7,
//     'hidden': 8,
//     'number': 9,
//     'image': 10,
//     'file': 11,
//     'recaptcha': 12,
// };

// const front_field_type_names = {
//     1: 'text',
//     2: 'toggle',
//     3: 'select',
//     4: 'select_searchable',
//     5: 'select_multiple',
//     6: 'date',
//     7: 'textarea',
//     8: 'hidden',
//     9: 'number',
//     10: 'image',
//     11: 'file',
//     12: 'recaptcha',
// }

const schema = Schema(
    {
        title: String,
        type: String,
        has_data: Boolean,
        field_validation_ids: [{
            type: Schema.Types.ObjectId,
            ref: "FieldValidationModel"
        }],
    },
    { collection: 'field_types', timestamps: true }
);

// schema.statics.types = field_types;
// schema.statics.front_type_names = front_field_type_names;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const FieldTypeModel =
    mongoose.models.FieldTypeModel || mongoose.model('FieldTypeModel', schema);

module.exports = {
    // field_types,
    // front_field_type_names,
    FieldTypeModel,
};
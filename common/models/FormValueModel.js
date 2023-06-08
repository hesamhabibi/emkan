const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        form_id: {
            type: Schema.Types.ObjectId,
            ref: "FormModel"
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
        fields: {},
        field_labels: [{}],
        tag_ids: [{
            type: Schema.Types.ObjectId,
            ref: "TagModel"
        }],
        category_id: {
            type: Schema.Types.ObjectId,
            ref: "Category_id"
        }
    },
    { collection: 'form_values', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const FormValueModel =
    mongoose.models.FormValueModel || mongoose.model('FormValueModel', schema);

module.exports = {
    FormValueModel,
};
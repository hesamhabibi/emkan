const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const deeps = {
    'attribute_variant': 1,
    'attribute_group': 2,
    'attribute': 3,
};

const types = {
    'text': 1,
    'big_text': 2,
    'two_answer_question': 3,
};

const schema = Schema(
    {
        parent_id: {
            type: Schema.Types.ObjectId,
            ref: "AttributeModel",
        },
        sort: Number,
        deep: Number,
        title: {},
        active: Boolean,

        // deep 1
        attribute_group_ids: [{
            type: Schema.Types.ObjectId,
            ref: "AttributeModel"
        }],
        // deep 2
        attribute_ids: [{
            type: Schema.Types.ObjectId,
            ref: "AttributeModel"
        }],
        // deep 3
        type: Number,
        description: {},
        default_attribute_value_id: { type: Schema.Types.ObjectId, ref: "AttributeValueModel" },
        show_in_filter: Boolean,

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    { collection: 'attributes', timestamps: true }
);

schema.statics.types = types;
schema.statics.deeps = deeps;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const AttributeModel =
    mongoose.models.AttributeModel || mongoose.model('AttributeModel', schema);

module.exports = {
    types,
    deeps,
    AttributeModel,
};
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        attribute_id: {
            type: Schema.Types.ObjectId,
            ref: "AttributeModel"
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "ProductModel"
        },
        value: {},
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    { collection: 'attribute_values', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const AttributeValueModel =
    mongoose.models.AttributeValueModel || mongoose.model('AttributeValueModel', schema);

module.exports = {
    AttributeValueModel,
};
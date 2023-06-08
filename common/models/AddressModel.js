const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;


const schema = Schema(
    {
        title: String,
        postal_code: String,
        city_id: String,
        state_id: String,
        address: String,
        location: {},
        mobile: String,
        is_default: Boolean,

        model_name: String,
        model_id: Schema.Types.ObjectId,

    },
    { collection: 'addresses', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const AddressModel =
    mongoose.models.AddressModel || mongoose.model('AddressModel', schema);

module.exports = {
    AddressModel
};
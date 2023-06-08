const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

// const types = {
//     'panel': "1",
//     'role': "2",
// };

const schema = Schema(
    {
        name: {
            type: String,
        },
        // type: { // type of access, can be: panel or role
        //     type: Number,
        // },
        description: {
            type: String,
        }
    },
    { collection: 'accesses', timestamps: true }
);

// schema.statics.types = types;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const AccessModel =
    mongoose.models.AccessModel || mongoose.model('AccessModel', schema);

module.exports = {
    // types,
    AccessModel,
};
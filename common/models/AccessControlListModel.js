const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = new Schema(
    {
        access_id: {
            type: Schema.Types.ObjectId,
            ref: 'AccessModel',
        },
        // access_type: {
        //     type: Number,
        // },
        access_component_id: {
            type: Schema.Types.ObjectId,
            ref: 'AccessComponentModel',
        },
        access_component_type: {
            type: Number,
        },
        access_component_key: {
            type: String
        },
        access_component_action_type: {
            type: Number
        },
        access_component_action: {
            type: String,
        }
    },
    { collection: 'access_control_list'/* , timestamps: true */ }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const AccessControlListModel =
    mongoose.models.AccessControlList || mongoose.model('AccessControlList', schema);

module.exports = {
    AccessControlListModel
};

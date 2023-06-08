const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const types = {
    'menu_item': "1",
    'column': "2",
    'route': "3",
    'id': "4",
    "action": "5",
};

const kind_statuses = {
    'panel': "1",
    'web': "2",
    'android': "3",
};

const schema = new Schema(
    {
        name: {
            type: String,
        },
        type: { // type of component, can be: menu_item,column,id or route
            type: Number,
        },
        key: {
            type: String,
        },
        action: {
            type: String,
        },
        field: {
            type: String,
        },
        description: {
            type: String,
        },
        sort: Number,
        parent_id: {
            type: Schema.Types.ObjectId,
            ref: 'AccessComponentModel',
        },
        kind_status: Number,
    },
    { collection: 'access_components', timestamps: true, toObject: { virtuals: true } }
);

schema.statics.types = types;
schema.statics.kind_statuses = kind_statuses;

schema.virtual('is_internal').get(function () {
    if (this.action)
        return !(this.action.includes('http') || this.action.includes('www'));
    return null;
});

schema.virtual('is_completed').get(function () {
    if (this.action)
        return true;
    return false;
});

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const AccessComponentModel =
    mongoose.models.AccessComponentModel || mongoose.model('AccessComponentModel', schema);

module.exports = {
    types,
    kind_statuses,
    AccessComponentModel,
};
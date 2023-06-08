const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        title: String,
        icon: String,
        sort: Number,
        show_in_menu: Boolean,
        badge_key: String,
        access_id: {
            type: Schema.Types.ObjectId,
            ref: 'AccessModel',
        },
        access_component_id: {
            type: Schema.Types.ObjectId,
            ref: 'AccessComponentModel',
        },
        parent_id: {
            type: Schema.Types.ObjectId,
            ref: 'MenuItemModel',
        },
    },
    { collection: 'menu_items', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const MenuItemModel =
    mongoose.models.MenuItemModel ||
    mongoose.model('MenuItemModel', schema);

module.exports = {
    MenuItemModel,
};
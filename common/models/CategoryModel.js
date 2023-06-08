const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const types = {
    'blog': 1,
    'page': 2,
    'product': 3,
    'catalogue': 4,
    'device': 5,
    'event': 6,
    'project': 7,
    'service': 8,
};

const schema = Schema(
    {
        title: {},
        active: Boolean,
        show_in_menu: Boolean,
        description: {},
        type: Number,
        sort: Number,
        parent_id: {
            type: Schema.Types.ObjectId,
            ref: "CategoryModel"
        },
        media: {
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            alt: String,
            url: String,
        },
        seo_id: {
            type: Schema.Types.ObjectId,
            ref: "SEOModel"
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },

    },
    { collection: 'categories', timestamps: true }
);

schema.statics.types = types;

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const CategoryModel =
    mongoose.models.CategoryModel || mongoose.model('CategoryModel', schema);

module.exports = {
    types,
    CategoryModel,
};
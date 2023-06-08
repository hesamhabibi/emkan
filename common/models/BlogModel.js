const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statuses = {
    'inactive': 1,
    'show': 2,
    'draft': 3,
};

const types = {
    'blog': 1,
    'page': 2,
    'catalogue': 3,
    'project': 4,
    'service': 5,
    'event': 6,
};

const schema = Schema(
    {
        title: {}, // multi language
        summary: {},
        description: {},
        status: Number,
        publishAt: Date,
        has_rating: Boolean,
        has_comment: Boolean,
        is_special: Boolean,
        type: Number,
        category_id: {
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
        media_gallery: [{
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            sort: Number,
            main: Boolean,
            alt: String,
            url: String,
        }],
        document: { // for catalogue
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
        tag_ids: [{
            type: Schema.Types.ObjectId,
            ref: "TagModel"
        }],
        tag_group_id: {
            type: Schema.Types.ObjectId,
            ref: "TagModel"
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'blogs',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.statics.statuses = statuses;
schema.statics.types = types;

schema.virtual('seo', {
    ref: 'SEOModel',
    localField: 'seo_id',
    foreignField: '_id',
    justOne: true
});

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const BlogModel =
    mongoose.models.BlogModel || mongoose.model('BlogModel', schema);

module.exports = {
    types,
    statuses,
    BlogModel,
};
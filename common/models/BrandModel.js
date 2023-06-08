const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const schema = Schema(
    {
        title: {},
        active: Boolean,
        show_in_menu: Boolean,
        description: {},
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
    { collection: 'brands', timestamps: true }
);


schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const BrandModel =
    mongoose.models.BrandModel || mongoose.model('BrandModel', schema);

module.exports = {
    BrandModel,
};
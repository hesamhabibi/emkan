const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const url_statuses = {
    'auto': 1,
    'custom': 2,
};

const robots_statuses = {
    'index_follow': 1,
    'noindex_follow': 2,
    'index_nofollow': 3,
    'noindex_nofollow': 4,
};

const schema = Schema(
    {
        title: {},
        description: {},
        keywords: {},
        url: String,
        url_status: Number,
        canonical_url: String,
        redirect_url_301: String,
        redirect_url_404: String,
        robots_status: Number,

        unique_key: String,
        model_name: String,
        model_id: Schema.Types.ObjectId,

    },
    { collection: 'seos', timestamps: true }
);

schema.statics.url_statuses = url_statuses;
schema.statics.robots_statuses = robots_statuses;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const SEOModel =
    mongoose.models.SEOModel || mongoose.model('SEOModel', schema);

module.exports = {
    url_statuses,
    robots_statuses,
    SEOModel
};
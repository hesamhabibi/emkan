const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const model_types = {
    // product types
    'product': 1,
    'download': 2,
    'service': 3,
    'preview': 4,

    // blog types
    'blog': 1,
    'page': 2,
    'catalogue': 3,
    'project': 4,
    'service': 5,
    'event': 6,
};

const schema = Schema(
    {
        title: String,
        text: String,
        confirmed: { type: Boolean, default: false },
        reply_to_id: {
            type: Schema.Types.ObjectId,
            ref: "CommentModel"
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
        model_name: String,
        model_type: Number,
        model_id: Schema.Types.ObjectId,

    },
    { collection: 'comments', timestamps: true }
);

schema.statics.model_types = model_types;

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const CommentModel =
    mongoose.models.CommentModel || mongoose.model('CommentModel', schema);

module.exports = {
    model_types,
    CommentModel,
};
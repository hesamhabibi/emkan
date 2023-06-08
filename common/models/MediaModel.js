const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const Float = require('mongoose-float').loadType(mongoose);

const { Schema } = mongoose;

const types = {
    video: 1,
    image: 2,
    audio: 3,
    unknown: 4,
    document: 5,
};

const schema = Schema(
    {
        is_public: Boolean,
        is_embedded: Boolean,
        embedded_html: String,
        url: String,
        path: String,
        extension: String,
        sort: Number,
        main: Boolean,
        type: Number,
        size: Float,
        alt: String,
        filename: String,
        relations: [{
            model_name: String,
            model_id: String,
        }],
        information: {},
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'medias',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.statics.types = types;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const MediaModel =
    mongoose.models.MediaModel ||
    mongoose.model('MediaModel', schema);

module.exports = {
    types,
    MediaModel,
};
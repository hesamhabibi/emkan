const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const statuses = {
    'hide': 1,
    'show': 2,
};

const schema = Schema(
    {
        name: {}, // multi language
        key: String,
        description: {}, // multi language
        status: Number,
        images: [{
            media_id: {
                type: Schema.Types.ObjectId,
                ref: "MediaModel"
            },
            sort: Number,
            alt: String,
            url: String,

            title: {}, // multi language
            link: String,
            description: {}, // multi language
        }],
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    { collection: 'sliders', timestamps: true }
);

schema.statics.statuses = statuses;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const SliderModel =
    mongoose.models.SliderModel || mongoose.model('SliderModel', schema);

module.exports = {
    statuses,
    SliderModel,
};
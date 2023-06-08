const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;


const schema = Schema(
    {
        title: {}, // multi language
        description: {}, // multi language
        state_id: String,
        city_id: String,
        address: {}, // multi language
        postal_code: String,
        location: {},
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
        label: {}, // multi language
        cellphone: String,

        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        }
    },
    { collection: 'deputations', timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const DeputationModel =
    mongoose.models.DeputationModel || mongoose.model('DeputationModel', schema);

module.exports = {
    DeputationModel
};
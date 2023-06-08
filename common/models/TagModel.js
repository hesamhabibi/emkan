const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;

const { Schema } = mongoose;

const deeps = {
    'tag': 1,
    'tag_group': 2,
};

const schema = Schema(
    {
        title: {},
        deep: Number,
        tag_group_ids: [{
            type: Schema.Types.ObjectId,
            ref: "TagModel"
        }],
    },
    { collection: 'tags', timestamps: false }
);

schema.statics.deeps = deeps;

schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const TagModel =
    mongoose.models.TagModel || mongoose.model('TagModel', schema);

module.exports = {
    deeps,
    TagModel,
};
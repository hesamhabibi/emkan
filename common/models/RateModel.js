const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanDefaults = require('mongoose-lean-defaults').default;
const Float = require('mongoose-float').loadType(mongoose);

const { Schema } = mongoose;

const schema = Schema(
    {
        rate: Float,
        model_id: Schema.Types.ObjectId,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "UserModel"
        },
    },
    {
        collection: 'rates',
        timestamps: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.statics.average = async function (model_id) {
    try {
        const result = (await this.aggregate([
            {
                $match: {
                    model_id: mongoose.Types.ObjectId(model_id),
                }
            },
            {
                $group: {
                    _id: "average_rate",
                    average_rate: {
                        $avg: "$rate"
                    }
                }
            }
        ]))[0];
        return result.average_rate || 0;
    } catch {
        return 0;
    }
};

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const RateModel =
    mongoose.models.RateModel || mongoose.model('RateModel', schema);

module.exports = {
    RateModel,
};
const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const mongoosePaginate = require("mongoose-paginate-v2");
const mongooseLeanVirtuals = require("mongoose-lean-virtuals");
const mongooseLeanDefaults = require("mongoose-lean-defaults").default;

const { Schema } = mongoose;

const statuses = {
  active: 1,
  inactive: 2,
};

const conditions_types = {
  weight: 1,
  price: 2,
};

const conditions_operators = {
  // number operators
  less_than: 1,
  less_than_or_equal: 2,
  equal: 3,
  not_equal: 4,
  more_than: 5,
  more_than_or_equal: 6,
};

const attributes_operators = {
  // number operators
  less_than: 1,
  between: 2,
  more_than: 3,
};

const schema = Schema(
  {
    title: {}, // multi language
    description: {},
    is_main: Boolean,
    is_default: Boolean,
    admin_description: String,
    status: Number,
    weight_sensitivity: Boolean,
    conditions: [
      {
        type: { type: Number }, // weight or amount
        operation: Number, // < = >
        value: JSON,
      },
    ],
    attributes: [
      {
        operator: Number,
        from_weight: Number,
        to_weight: Number,
      },
    ],
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    collection: "shipping_methods",
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

schema.statics.statuses = statuses;
schema.statics.conditions_types = conditions_types;
schema.statics.conditions_operators = conditions_operators;
schema.statics.attributes_operators = attributes_operators;

schema.plugin(aggregatePaginate);
schema.plugin(mongoosePaginate);
schema.plugin(mongooseLeanVirtuals);
schema.plugin(mongooseLeanDefaults);

const ShippingMethodModel =
  mongoose.models.ShippingMethodModel ||
  mongoose.model("ShippingMethodModel", schema);

module.exports = {
  statuses,
  conditions_types,
  conditions_operators,
  attributes_operators,
  ShippingMethodModel,
};

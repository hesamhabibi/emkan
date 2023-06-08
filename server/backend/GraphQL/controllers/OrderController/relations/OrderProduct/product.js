const { arrays_equal } = require("@helpers/ArrayHelper");

module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        const product = await ProductModel.findOne({ _id: parent.product_id });

        // let mix_variant = product.mix_variant;

        // const mix_variant_products = [];

        // for (let i in mix_variant) {
        //     mix_variant_products.push({
        //         ...(product.toObject()),
        //         mix_variant: mix_variant[i],
        //     });
        // }

        const order_mix_variant = product.mix_variant.find((m) => {
            return arrays_equal(m.keys, parent.mix_variant_keys);
        });

        return {
            ...(product.toObject()),
            order_mix_variant,
        };

    } catch (e) {
        return null;
    }
};
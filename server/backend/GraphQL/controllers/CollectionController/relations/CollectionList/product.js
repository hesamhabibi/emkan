const { arrays_equal } = require("@helpers/ArrayHelper");

module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        if (!parent.has_variant_key) {
            const product = await ProductModel.findOne({ _id: parent.product_id });
            return product;
        } else {
            const product = await ProductModel.findOne({ _id: parent.product_id });
            let mix_variant = product.mix_variant;

            const mix_variant_products = [];

            for (let i in mix_variant) {
                mix_variant_products.push({
                    ...product,
                    mix_variant: mix_variant[i],
                });
            }

            return mix_variant_products.find((product) => {
                return arrays_equal(product.mix_variant.keys, parent.mix_variant_keys);
            });

            // const valid_keys = parent.variant_keys;

            // mix_variant = mix_variant.filter((mix_variant) => {
            //     return valid_keys.find((valid_key) => {
            //         if (mix_variant.keys.length != valid_key.length)
            //             return false;
            //         let found_all_keys = true;
            //         mix_variant.keys.map((key) => {
            //             if (!valid_key.includes(key)) {
            //                 found_all_keys = false;
            //             }
            //         });
            //         return found_all_keys;
            //     });
            // });

            // product.mix_variant = mix_variant;
            // return product;
        }
    } catch (e) {
        return null;
    }
};
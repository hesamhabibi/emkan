const { CollectionModel } = require('@models');
const { get_products } = require('./get_products');
const { arrays_equal } = require('@helpers/ArrayHelper');

module.exports = async (collection_id, filter_query = null, sort_query = null) => {
    // find collection
    let collection;
    try {
        collection = await CollectionModel.findById(collection_id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        collection = null;
    }
    // check collection exists
    if (!collection)
        return null;

    if (collection.type == CollectionModel.types.static) {
        const mix_variant_products = [];
        for (let i in collection.list) {
            const item = collection.list[i];
            try {
                if (item.show) {
                    if ((!item.expireAt) || (item.expireAt && item.expireAt instanceof Date && item.expireAt.getTime() > Date.now())) {
                        const product = await ProductModel.findOne({ _id: parent.product_id });
                        const temp_mix_variant_products = [];
                        for (let i in product.mix_variant) {
                            temp_mix_variant_products.push({
                                ...product,
                                mix_variant: product.mix_variant[i],
                            });
                        }
                        if (item.has_variant_key) {
                            const single_mix_variant = temp_mix_variant_products.find((product) => {
                                return arrays_equal(product.mix_variant.keys, parent.mix_variant_keys);
                            });
                            mix_variant_products.push(single_mix_variant);
                        } else {
                            mix_variant_products.push(...temp_mix_variant_products);
                        }
                    }
                }
            } catch { /* empty */ }
        }
        return mix_variant_products;
    } else {
        const mix_variant_products = await get_products(collection.condition, filter_query,sort_query);
        return mix_variant_products;
    }
}
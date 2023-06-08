module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        const product = await ProductModel.findById(parent.product_id);
        const new_mix_variant = (product?.mix_variant || []).find(m => {
            return String(m.keys) == String(parent.mix_variant_keys);
        });
        product.mix_variant = [new_mix_variant];
        return product;
    } catch {
        return null;
    }
};
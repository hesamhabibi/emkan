const { collect } = require('collect.js');

module.exports = async (parent, args, { models: { ProductModel } }) => {
    const products = await ProductModel.find({}).lean({ virtuals: true, defaults: true });
    // console.log(products);
    const labels = collect(products)
        .filter(product => product.has_variant) // just products that has variant
        .map(product => product.variant)
        .reduce((collection, variants) => collection.merge(variants), collect([])) // merge variant arrays
        .filter(variant => variant.type === ProductModel.variant_types.color) // just color type variants
        .reduce((collection, variant) => collection.merge(variant.labels), collect([])) // merge labels arrays
        .unique(label => label.values.color_value)
        .all();

    return labels;
};
module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        return await ProductModel.findOne({ _id: parent.product_id });
    } catch (e) {
        return [];
    }
};
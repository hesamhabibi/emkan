// const { get_products_by_collection_id } = require('@helpers/CollectionHelper');
module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        // return await get_products_by_collection_id(parent.related_products.collection_id);
        if (parent.category_id)
            return await ProductModel.find({
                category_id: parent.category_id, _id: { $ne: parent._id },
                status: ProductModel.statuses.show,
                publishAt: { $lt: new Date() },
            });
        return [];
    } catch {
        return [];
    }
};
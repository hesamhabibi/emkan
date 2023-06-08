const { getPriceHistory } = require('@helpers/PriceHelper');
const { ProductModel } = require('@models');

module.exports = async (parent) => {
    try {
        return (await getPriceHistory({ model_id: parent.product_id, modelName: ProductModel.modelName }, parent.keys)).prices;
    } catch (e) {
        return [];
    }
};
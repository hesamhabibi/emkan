const { getPrice } = require('@helpers/PriceHelper');
const { ProductModel } = require('@models');

module.exports = async (parent) => {
    try {
        return (await getPrice({ model_id: parent.product_id, modelName: ProductModel.modelName }, parent.keys)).price;
        // return await PriceModel.findOne({ _id: parent.price_id });
    } catch (e) {
        return null;
    }
};
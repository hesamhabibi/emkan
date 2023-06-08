const createPrice = require('./createPrice');

module.exports = async (instance, input) => {

    const create_result = await createPrice(input);
    if (create_result.price) {
        create_result.price.model_name = instance?.constructor?.modelName || instance.model_name || instance.modelName;
        create_result.price.model_id = instance.model_id || instance._id || instance.id;
        create_result.price.model_variant_keys = instance.model_variant_keys;
        await create_result.price.save();
    }
    return create_result;
};
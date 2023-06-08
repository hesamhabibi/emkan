module.exports = async (parent, args, { models: { PriceModel } }) => {
    try {

        // find main variant
        let main_mix_variant = null;
        try {
            for (let i = 0; i < parent.mix_variant.length; i += 1) {
                try {
                    if (parent.mix_variant[i].is_main_price)
                        main_mix_variant = parent.mix_variant[i];
                } catch (e) {
                    console.log(e);
                }
            }

            if (!main_mix_variant) {
                main_mix_variant = parent.mix_variant[0];
            }
        } catch (e) {
            console.log(e);
        }

        // find current price to query history based on current price
        let price;
        try {
            price = await PriceModel.findOne({ _id: main_mix_variant.price_id });
        } catch {
            price = null;
        }
        if (!price) {
            return [];
        }
        return await PriceModel.find({ model_name: price.model_name, model_id: price.model_id, model_variant_keys: price.model_variant_keys, type: price.type }).sort({ createdAt: -1 });
    } catch (e) {
        return [];
    }
};
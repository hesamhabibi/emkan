module.exports = async (parent, args, { models: { PriceModel } }) => {
    try {

        let main_mix_variant = null;
        try {
            for (let i = 0; i < parent.mix_variant.length; i += 1) {
                try {
                    if (parent.mix_variant[i].is_main_price)
                        main_mix_variant = parent.mix_variant[i];
                } catch (e) {
                    console.log();
                }
            }

            if (!main_mix_variant) {
                main_mix_variant = parent.mix_variant[0];
            }
        } catch (e) {
            console.log(e);
        }

        return await PriceModel.findOne({ _id: main_mix_variant.price_id });
    } catch (e) {
        return null;
    }
};
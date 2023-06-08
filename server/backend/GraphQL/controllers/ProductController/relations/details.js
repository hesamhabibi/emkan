module.exports = async (parent) => {
    try {
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
            if (!main_mix_variant && parent.mix_variant?.details)
                main_mix_variant = parent.mix_variant;
        } catch (e) {
            console.log(e);
        }

        return main_mix_variant.details;
    } catch (e) {
        return null;
    }
};
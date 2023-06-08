module.exports = async (parent) => {
    try {
        if (parent.order_mix_variant && typeof parent.order_mix_variant == 'object')
            return [parent.order_mix_variant];
        else
            return [];
    } catch (e) {
        return [];
    }
};
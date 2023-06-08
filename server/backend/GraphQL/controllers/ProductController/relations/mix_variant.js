module.exports = async (parent) => {
    try {
        if (!parent.has_variant)
            return [];
        if (Array.isArray(parent.mix_variant)) {
            // sort media gallery
            const mix_variant = parent.mix_variant.sort((first, second) => { try { return first.sort - second.sort; } catch { return 0; } }).map(m => { m.product_id = parent._id; return m; });
            return mix_variant;
        } else if (typeof parent.mix_variant === 'object') {
            parent.mix_variant.product_id = parent._id;
            return [parent.mix_variant];
        } else {
            return [];
        }
    } catch (e) {
        return [];
    }
};
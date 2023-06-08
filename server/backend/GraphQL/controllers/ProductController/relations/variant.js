module.exports = async (parent) => {
    try {
        if (!parent.has_variant)
            return [];
        return parent.variant;
    } catch (e) {
        return [];
    }
};
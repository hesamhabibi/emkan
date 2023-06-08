module.exports = async (parent) => {
    try {
        return await parent.calculate_sum();
    } catch (e) {
        return null;
    }
};
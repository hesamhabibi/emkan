module.exports = async (parent) => {
    try {
        return parent.user_information;
    } catch (e) {
        return null;
    }
};
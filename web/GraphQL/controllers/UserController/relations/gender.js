module.exports = async (parent) => {
    try {
        return parent.user_information.gender;
    } catch {
        return null;
    }
};
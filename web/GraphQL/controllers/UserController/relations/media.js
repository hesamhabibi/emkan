module.exports = async (parent) => {
    try {
        return parent.user_information.media;
    } catch {
        return null;
    }
};
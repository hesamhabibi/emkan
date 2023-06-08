module.exports = async (parent) => {
    try {
        return {
            media_id: parent.media_id,
            alt: parent.alt,
            url: parent.url,
        };
    } catch (e) {
        return {};
    }
};
module.exports = async (parent) => {
    try {
        if (parent.has_media_gallery) {
            // sort media gallery
            const media_gallery = parent.media_gallery.sort((first, second) => { try { return first.sort - second.sort; } catch { return 0; } });
            return media_gallery;
        } else {
            return [];
        }
    } catch (e) {
        return [];
    }
};
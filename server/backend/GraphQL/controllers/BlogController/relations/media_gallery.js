module.exports = async (parent) => {
    try {
        // sort media gallery
        parent.media_gallery.sort((first, second) => { try { return first.sort - second.sort; } catch { return 0; } });
        return parent.media_gallery;
    } catch (e) {
        return [];
    }
};
module.exports = async (parent) => {
    try {
        // sort media gallery
        parent.images = parent.images.sort((first, second) => { try { return first.sort - second.sort; } catch { return 0; } });
        console.log(parent.images);
        return parent.images;
    } catch (e) {
        return [];
    }
};
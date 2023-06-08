module.exports = (value) => {
    try {
        return encodeURIComponent(value);
    } catch {
        return '';
    }
}
module.exports = (value) => {
    try {
        return decodeURIComponent(value);
    } catch {
        return ''
    }
}
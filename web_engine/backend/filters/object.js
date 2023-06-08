module.exports = (value) => {
    if (typeof value == 'string') {
        try {
            value = JSON.parse(value);
        } catch { /* empty */ }
    }
    return value || {};
}
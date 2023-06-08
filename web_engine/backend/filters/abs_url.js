module.exports = (value, ...params) => {
    try {
        if (!value.startsWith('/'))
            return `/${value}`;
    } catch { /* empty */ }
    return value;
}
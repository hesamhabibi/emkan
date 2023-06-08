module.exports = (value) => {
    try {
        if (String(value).startsWith('/fa/'))
            return value.slice(4);
        if (String(value).startsWith('/en/'))
            return value.slice(4);
        if (String(value).startsWith('/ar/'))
            return value.slice(4);
        if (String(value).startsWith('/'))
            return value.slice(1);
    } catch { /* empty */ }
    return value;
}
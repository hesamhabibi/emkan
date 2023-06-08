// todo: use in all filters
const valueOf = (value) => {
    try {
        return value.valueOf();
    } catch {
        return value;
    }
}

module.exports = {
    valueOf,
}
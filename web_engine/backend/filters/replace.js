const { valueOf } = require('./helpers');

module.exports = (value, pattern, replace_with = "") => {
    value = valueOf(value);
    try {
        return String(value).replace(RegExp(pattern), replace_with);
    } catch (e) {
        console.log (e)
        return "";
    }
}
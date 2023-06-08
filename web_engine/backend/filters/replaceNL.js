const { valueOf } = require('./helpers');

module.exports = (value) => {
    try {
        return String(valueOf(value)).replace(/\n/g, "<br>");
    } catch (e) {
        return null;
    }
}
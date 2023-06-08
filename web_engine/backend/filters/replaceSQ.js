const { valueOf } = require('./helpers');

module.exports = (value) => {
    try {
        return String(valueOf(value)).replace(/"/g, "'");
    } catch (e) {
        return null;
    }
}
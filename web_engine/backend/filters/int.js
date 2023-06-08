const { valueOf } = require('./helpers');

module.exports = (value) => {
    return parseInt(valueOf(value)) ?? null;
}
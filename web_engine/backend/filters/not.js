const { valueOf } = require('./helpers');

module.exports = (value) => {
    value = valueOf(value);
    if (typeof value == 'string' && value == '0')
        value = false;
    return !value;
}
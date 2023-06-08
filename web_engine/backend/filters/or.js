const { valueOf } = require('./helpers');

module.exports = (value, ...params) => {
    let new_value = valueOf(value);
    for (let i in params) {
        new_value = new_value || valueOf(params[i]);
    }
    return new_value;
}
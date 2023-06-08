const { valueOf } = require('./helpers');

module.exports = function (value, ...params) {
    value = valueOf(value);
    return this.context.environments._translator(this.context.environments.lang, value);
}
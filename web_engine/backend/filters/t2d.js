const moment = require('moment-jalaali');
const { valueOf } = require('./helpers');

module.exports = (value, format = "jYYYY/jMM/jDD") => {
    value = valueOf(value);
    try {
        const result = moment(new Date(parseInt(value)));
        return result.format(format);
    } catch (e) {
        return null;
    }
}
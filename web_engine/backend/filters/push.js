const { valueOf } = require('./helpers');

module.exports = (value, ...others) => {
    try {
        if (Array.isArray(value)) {
            return [...valueOf(value), ...others];
        } else if (typeof value == 'string') {
            let result = value;
            for (let i in others) {
                result += others[i];
            }
            return result;
        }
    } catch (e) {
        return value;
    }
}
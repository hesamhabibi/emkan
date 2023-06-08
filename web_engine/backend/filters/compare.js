const { valueOf } = require('./helpers');

module.exports = (value, otherValue, operation='==') => {
    let new_value = valueOf(value);
    let new_otherValue = valueOf(otherValue);
    switch (operation) {
        case 'eq':
        case '==':
            return new_value == new_otherValue;
        case '===':
            return new_value === new_otherValue;
        case 'ne':
        case '!=':
            return new_value != new_otherValue;
        case '!==':
            return new_value !== new_otherValue;
        case 'lt':
        case '<':
            return new_value < new_otherValue;
        case 'lte':
        case '<=':
            return new_value <= new_otherValue;
        case 'mt':
        case '>':
            return new_value > new_otherValue;
        case 'mte':
        case '>=':
            return new_value >= new_otherValue;
    }
    return false;
}
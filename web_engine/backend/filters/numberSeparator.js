const { valueOf } = require('./helpers');

module.exports = (value, separator = ',', chunk = 3) => {
    value = valueOf(value);
    try {
        if (value) {
            const number = String(value);
            let new_number = "";
            let counter = 0;
            for (let i = number.length - 1; i >= 0; i -= 1) {
                if (counter >= chunk) {
                    new_number = separator + new_number;
                    counter = 0;
                }
                counter += 1;
                new_number = number[i] + new_number;
            }
            return new_number;
        } else {
            return 0;
        }
    } catch (e) {
        return value;
    }
}
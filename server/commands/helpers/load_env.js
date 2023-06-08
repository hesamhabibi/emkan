const fs = require('fs');

module.exports = async (filename = 'env.example') => {

    const data = String(fs.readFileSync(filename));

    const lines = data.split('\n');

    const result = {};
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const e_pos = line.indexOf('=');
        if (e_pos > 0)
            if (!line.substr(0, e_pos).startsWith('#'))
                result[line.substr(0, e_pos)] = line.substr(e_pos + 1);
    }

    // replace variables
    const keys = Object.keys(result);
    for (let j = 0; j < keys.length; j += 1) {
        for (let i = 0; i < keys.length; i += 1) {
            result[keys[i]] = result[keys[i]].replace(`$${keys[j]}`, result[keys[j]]);
        }
    }

    return result;
};
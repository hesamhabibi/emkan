const fs = require('fs');

module.exports = async (values, path = '.env.example') => {

    // read file
    let keys = Object.keys(values);
    let data;
    try {
        data = String(fs.readFileSync(path));
    } catch {
        data = '';
    }
    const lines = data.split('\n');
    let buffer = '';

    let last_line = '';
    // for each line check if has value
    for (let i = 0; i < lines.length; i += 1) {
        try {
            if (last_line === '' && lines[i] === '')
                continue;
            last_line = lines[i];
            const e_pos = lines[i].indexOf('=');
            if (e_pos > 0) {
                const key = lines[i].substr(0, e_pos).trim();
                // if yes: add key with its new value to buffer and remove it from remain_keys array
                if (keys.includes(key)) {
                    buffer += `${key}=${values[key]}`;
                    keys = keys.filter(item => item !== key);
                } else { // if no: add line itself to buffer
                    buffer += lines[i];
                }
            } else {
                buffer += lines[i];
            }
        } catch (e) {
            console.log(e);
            buffer += lines[i];
        }
        if (i !== lines.length - 1)
            buffer += '\n';
    }
    // at the end, check if any key remains
    if (keys.length > 0) {
        // for each remain key addd key with its value to buffer
        for (let i = 0; i < keys.length; i += 1) {
            buffer += `\n${keys[i]}=${values[keys[i]]}`;
        }
    }

    // save buffer to file
    fs.writeFileSync(path, buffer);

};
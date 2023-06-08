const en = require('../lang/en');
const fa = require('../lang/fa');

const messages = {
    en,
    fa,
};

let local = 'fa';

const attr_formatter = (attribute) => {
    if (attribute.includes('.')) {
        const attrs = attribute.split('.');
        return attrs[attrs.length - 1];
    } return attribute;
};

const trans = (name, options) => {
    try {
        let message = messages[local][name];
        if (typeof message === 'string') {
            if (typeof options === 'object') {
                const keys = Object.keys(options);
                for (let i = 0; i < keys.length; i += 1) {
                    message = message.replace(`:${keys[i]}`, trans(attr_formatter(options[keys[i]])));
                }
            } else {
                message = message.replace(':', '');
            }
            return message;
        }
        return name.replace(/_/g, ' ');
    } catch {
        return name;
    }
};

const set_local = (l) => {
    local = l;
};

module.exports = {
    attr_formatter,
    trans,
    set_local,
};
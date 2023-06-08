const { trans } = require('../TranslateHelper');

/*
examples:
{'exists': {model:Model, field:'field_name'}}
{'exists': {model:Model, field:'field_name', query:{'extra query'}}
'exists:ModelName,field_name'
*/

module.exports = async (value, attribute, req, passes) => {
    let pass = false;
    try {
        if (typeof attribute === 'string') {
            const arr_attribute = attribute.split(',');
            for (let i = 0; i < arr_attribute.length; i += 1) {
                if (String(arr_attribute[i]) !== '')
                    if (value == arr_attribute[i]) {
                        pass = true;
                        break;
                    }
            }
        } else {
            for (let i = 0; i < attribute.length; i += 1)
                if (attribute[i] == value) {
                    pass = true;
                    break;
                }
        }
    } catch {
        pass = false;
    }
    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('in_validation_error', { attr: req }))); }
    });

};
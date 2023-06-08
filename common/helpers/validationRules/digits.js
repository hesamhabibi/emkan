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
        if (typeof value === 'string' && value.length === parseInt(attribute, 10))
            if (/^\d+$/.test(value))
                pass = true;
            else
                pass = false;
        else
            pass = false;

    } catch {
        pass = false;
    }
    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('digits_validation_error', { attr: req }))); }
    });

};
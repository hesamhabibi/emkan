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
        pass = RegExp(/^[0-9]{13}$/).test(value);
    } catch {
        pass = false;
    }
    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('timestamp_validation_error', { attr: req }))); }
    });

};
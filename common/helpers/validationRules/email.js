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
        const email_regex = RegExp(/.+@.+\..+/);
        if (email_regex.test(value))
            pass = true;
        else
            pass = false;

    } catch {
        pass = false;
    }
    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('email_validation_error', { attr: req }))); }
    });

};
const { trans } = require('../TranslateHelper');

/*
examples:
{'exists': {model:Model, field:'field_name'}}
{'exists': {model:Model, field:'field_name', query:{'extra query'}}
'exists:ModelName,field_name'
*/

module.exports = async (value, attribute, req, passes) => {
    let pass = true;
    try {
        await value;
    } catch {
        pass = false;
    }
    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('file_error', { attr: req }))); }
    });

};
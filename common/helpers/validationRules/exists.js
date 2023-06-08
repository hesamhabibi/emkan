const mongoose = require('mongoose');
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
        let model;
        let field;
        let query;

        if (typeof attribute === 'string') {
            const parts = attribute.split(',');
            [model, field, query] = parts;
        } else {
            model = attribute.model;
            field = attribute.field;
            query = attribute.query;
        }

        if (typeof model === 'string')
            model = mongoose.models[model];
        if (!field)
            field = req;
        if (typeof query === 'string') {
            try {
                query = JSON.parse(query);
                if (typeof query !== 'object') {
                    query = null;
                }
            } catch (e) {
                console.log('error in exists rule;', e);
                query = null;
            }
        }

        if (query && Object.keys(query).length !== 0) // if don't have extra query
            pass = await model.exists({ '$and': [{ [field]: value }, query] });
        else
            pass = await model.exists({ [field]: value });
    } catch (e) {
        console.log('error in exists rule:', e);
        pass = false;
    }

    return new Promise((resolve) => {
        if (pass) {
            resolve(passes());
        } else {
            let attr = req;
            try {
                if (attribute.attr) attr = attribute.attr;
            } catch { attr = req; }
            resolve(passes(false, trans('not_exists_error', { attr })));
        }
    });

};
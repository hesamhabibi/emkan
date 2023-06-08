/* eslint-disable no-else-return */
const { collect } = require('collect.js');
const getFormValuesByCollection = require('../helpers/getFormValuesByCollection');

module.exports = async (parent, args) => {
    const { collections = {} } = args;

    let form_values = await getFormValuesByCollection(collections);

    let fields = [];
    for (let i = 0; i < form_values.length; i += 1) {
        const keys = form_values[i].field_labels;
        console.log(keys);
        fields = [...fields, ...(keys.length ? keys : [])];
    }
    return collect(fields).unique('name').map(field => { return { id: field.name, name: field.label }; }).all();
};
/* eslint-disable no-else-return */
const { collect } = require('collect.js');
const getFormValuesByCollection = require('../helpers/getFormValuesByCollection');

module.exports = async (parent, args) => {
    const { collections = {}, fields = [], sort_fields = [] } = args;

    let form_values = await getFormValuesByCollection(collections);

    // sort values
    if (Array.isArray(sort_fields)) {
        for (let i = sort_fields.length - 1; i >= 0; i -= 1) {
            try {
                const sort_field = sort_fields[i].field;
                const descending = sort_fields[i].desc;
                form_values = form_values.sort(({ fields: a }, { fields: b }) => {
                    let is_a_valid;
                    try {
                        if (JSON.parse(a[sort_field])) {
                            is_a_valid = true;
                        }
                    } catch {
                        is_a_valid = false;
                    }

                    let is_b_valid;
                    try {
                        if (JSON.parse(b[sort_field])) {
                            is_b_valid = true;
                        }
                    } catch {
                        is_b_valid = false;
                    }

                    if (!is_a_valid && !is_b_valid) {
                        return 0;
                    } else if (!is_a_valid && is_b_valid) {
                        return -1 * (descending ? -1 : 1);
                    } else if (is_a_valid && !is_b_valid) {
                        return 1 * (descending ? -1 : 1);
                    }

                    let is_number;
                    try {
                        is_number = typeof JSON.parse(a[sort_field]) === 'number';
                        is_number = is_number && typeof JSON.parse(b[sort_field]) === 'number';
                    } catch {
                        is_number = false;
                    }

                    if (is_number) {
                        return (JSON.parse(a[sort_field]) - JSON.parse(b[sort_field])) * (descending ? -1 : 1);
                    } else {
                        if (a[sort_field] > b[sort_field])
                            return 1 * (descending ? -1 : 1);
                        else if (a[sort_field] < b[sort_field])
                            return -1 * (descending ? -1 : 1);
                        return 0;
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }

    // filter empty fields values
    form_values = form_values.filter((item) => {
        try {
            return Object.keys(item.fields).length && !Array.isArray(item.fields);
        } catch {
            return false;
        }
    });

    console.log(form_values);

    // json decode field values
    form_values = form_values.map((item) => {
        const keys = Object.keys(item.fields);
        for (let i = 0; i < keys.length; i += 1) {
            try {
                item.fields[keys[i]] = JSON.parse(item.fields[keys[i]]);
            } catch (e) {
                console.log(e);
            }
        }
        return item;
    });

    if (fields) {
        return collect(form_values).pluck('fields').map(value => { return collect(value).only(fields).all(); }).all();
    } else {
        return collect(form_values).pluck('fields').all();
    }
};
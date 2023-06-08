const { get_setting } = require('./SettingHelper');

function convert_filter_to_mongodb(operator, value) {
    switch (operator) {
        case 'LessThan': return { '$lt': value };
        case 'LessThanOrEqual': return { '$lte': value };
        case 'Equal': return { '$eq': value };
        case 'MoreThanOrEqual': return { '$gte': value };
        case 'MoreThan': return { '$gt': value };
        case 'NotEqual': return { '$ne': value };
        case 'Regex': return { '$regex': value };
        case 'Like': return { '$regex': `${value}` };
        case 'Includes': return value;
        default: return { '$eq': value };
    }
}

const filter_query = async (filter, query = null, type = 'web') => {

    // get valid langs:
    let all_locals = ["fa", "en"];
    if (type == 'panel') {
        try {
            const setting = await get_setting('panel_content_languages');
            all_locals = setting.value.map(lang => lang.code);
        } catch (e) {
            all_locals = ['en', 'fa'];
        }
    } else {
        try {
            const setting = await get_setting('web_content_languages');
            all_locals = setting.value.map(lang => lang.code);
        } catch (e) {
            console.log('error in get settings:', e);
            all_locals = ['en', 'fa'];
        }
    }

    // ---------------------------

    const auto_query = [];
    if (filter) {
        const keys = Object.keys(filter);
        for (let i = 0; i < keys.length; i += 1) {
            const key = keys[i];
            if (Array.isArray(filter[key])) {
                if (filter[key].length === 1) {
                    let fields = filter[key][0]?.value?.fields;
                    if (fields && Array.isArray(fields) && fields.length > 0) { // Multilang
                        if (fields.includes('all')) {
                            fields = all_locals;
                        }
                        const expressions = [];
                        for (let f = 0; f < fields.length; f += 1) {
                            if (filter[key][0].value.value)
                                expressions.push({ [String(key) + '.' + String(fields[f])]: convert_filter_to_mongodb(filter[key][0].operator, filter[key][0].value.value || '') });
                        }
                        if (expressions.length > 0)
                            auto_query.push({ "$or": expressions });
                    } else {
                        const expression = convert_filter_to_mongodb(filter[key][0].operator, filter[key][0].value);
                        auto_query.push({ [key]: expression });
                    }
                } else if (filter[key].length > 1) {
                    let fields = filter[key][0]?.value?.fields;
                    if (fields && Array.isArray(fields) && fields.length > 0) { // Multilang
                        if (fields.includes('all')) {
                            fields = all_locals;
                        }
                        for (let j = 0; j < filter[key].length; j += 1) {
                            let fields = filter[key][j]?.value?.fields;
                            const expressions = [];
                            for (let f = 0; f < fields.length; f += 1) {
                                if (filter[key][j].value.value)
                                    expressions.push({ [String(key) + '.' + String(fields[f])]: convert_filter_to_mongodb(filter[key][j].operator, filter[key][j].value.value || '') });
                            }
                            if (expressions.length > 0)
                                auto_query.push({ "$or": expressions });
                        }
                    } else {
                        let expressions = {};
                        for (let j = 0; j < filter[key].length; j += 1)
                            expressions = { ...expressions, ...convert_filter_to_mongodb(filter[key][j].operator, filter[key][j].value) };
                        auto_query.push({ [key]: expressions });
                    }
                } else {
                    try {
                        const expression = convert_filter_to_mongodb(filter[key][0].operator, filter[key][0].value);
                        auto_query.push({ [key]: expression });
                    } catch { /* empty */ }
                }
            }
        }

        let merged_query;
        if (auto_query.length === 0) {
            if (query === null) {
                merged_query = {}; // no filter and no query
            } else {
                merged_query = query; // just query
            }
        } else if (query === null) {
            merged_query = { '$and': auto_query }; // just filter query
        } else {
            merged_query = { '$and': [query, { '$and': auto_query }] };
        }

        return merged_query;
    }
    return query || {};
};

module.exports = { filter_query };
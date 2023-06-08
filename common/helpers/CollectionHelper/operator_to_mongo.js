
const { CollectionModel } = require('../../models');


const operator_to_mongo_query = async (field_name, operator, value, is_multi_language = false, multi_language_fields) => {
    const wheres_operators = CollectionModel.wheres_operators;

    if (is_multi_language) {
        const query = [];
        switch (operator) {
            case wheres_operators.less_than:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $lt: value } }
                    );
                }); return { $or: query };
            case wheres_operators.less_than_or_equal:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $lte: value } }
                    );
                }); return { $or: query };
            default: case wheres_operators.equal:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $eq: value } }
                    );
                }); return { $or: query };
            case wheres_operators.not_equal:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $ne: value } }
                    );
                }); return { $or: query };
            case wheres_operators.more_than:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $gt: value } }
                    );
                }); return { $or: query };
            case wheres_operators.more_than_or_equal:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $gte: value } }
                    );
                }); return { $or: query };
            case wheres_operators.regex:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $regex: value } }
                    );
                }); return { $or: query };

            case wheres_operators.in:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $in: value } }
                    );
                }); return { $or: query };

            case wheres_operators.includes:
                (multi_language_fields || []).map(lang => {
                    query.push(
                        { [`${field_name}.${lang}`]: { $regex: value } }
                    );
                }); return { $or: query };
            // case wheres_operators.all: // todo: write $all operator
            //     (multi_language_fields || []).map(lang => {
            //         query.push(
            //             { [`${field_name}.${lang}`]: { $regex: value[0] } }
            //         );
            //     }); return { $or: query };
        }
    } else {
        switch (operator) {
            case wheres_operators.less_than: return { [field_name]: { $lt: value } };
            case wheres_operators.less_than_or_equal: return { [field_name]: { $lte: value } };
            default: case wheres_operators.equal: return { [field_name]: { $eq: value } };
            case wheres_operators.not_equal: return { [field_name]: { $ne: value } };
            case wheres_operators.more_than: return { [field_name]: { $gt: value } };
            case wheres_operators.more_than_or_equal: return { [field_name]: { $gte: value } };
            case wheres_operators.regex: return { [field_name]: { $regex: value } };

            case wheres_operators.in: return { [field_name]: { $in: value } };

            case wheres_operators.includes: return { [field_name]: value };
            case wheres_operators.all: return { [field_name]: { $all: value } };
        }
    }
};

const operator_to_mongo_filter_query = async (field, operator, value, is_multi_language = false, multi_language_fields) => {
    const wheres_operators = CollectionModel.wheres_operators;
    if (is_multi_language) {
        const query = [];
        switch (operator) { // todo: value can be string of object of strings
            case wheres_operators.less_than:
                (multi_language_fields || []).map(lang => {
                    query.push({ $lt: [`${field}.${lang}`, value] });
                });
                return { $or: query };
            case wheres_operators.less_than_or_equal:
                (multi_language_fields || []).map(lang => {
                    query.push({ $lte: [`${field}.${lang}`, value] });
                });
                return { $or: query };
            default: case wheres_operators.equal:
                (multi_language_fields || []).map(lang => {
                    query.push({ $eq: [`${field}.${lang}`, value] });
                });
                return { $or: query };
            case wheres_operators.not_equal:
                (multi_language_fields || []).map(lang => {
                    query.push({ $ne: [`${field}.${lang}`, value] });
                });
                return { $or: query };
            case wheres_operators.more_than:
                (multi_language_fields || []).map(lang => {
                    query.push({ $gt: [`${field}.${lang}`, value] });
                });
                return { $or: query };
            case wheres_operators.more_than_or_equal:
                (multi_language_fields || []).map(lang => {
                    query.push({ $gte: [`${field}.${lang}`, value] });
                });
                return { $or: query };
            case wheres_operators.regex:
                (multi_language_fields || []).map(lang => {
                    query.push({ $regexMatch: { input: `${field}.${lang}`, regex: value } });
                });
                return { $or: query };

            case wheres_operators.in:
                (multi_language_fields || []).map(lang => {
                    query.push({ $in: [`${field}.${lang}`, value] });
                });
                return { $or: query };

            case wheres_operators.includes:
                (multi_language_fields || []).map(lang => {
                    query.push({ $in: [value, `${field}.${lang}`] });
                });
                return { $or: query };
            // case wheres_operators.all: return { $allElementsTrue: [{ $in: [field, value] }] }; // todo: write $all filter
        }
    } else {
        switch (operator) {
            case wheres_operators.less_than: return { $lt: [field, value] };
            case wheres_operators.less_than_or_equal: return { $lte: [field, value] };
            default: case wheres_operators.equal: return { $eq: [field, value] };
            case wheres_operators.not_equal: return { $ne: [field, value] };
            case wheres_operators.more_than: return { $gt: [field, value] };
            case wheres_operators.more_than_or_equal: return { $gte: [field, value] };
            case wheres_operators.regex: return { $regexMatch: { input: field, regex: value } };

            case wheres_operators.in: return { $in: [field, value] };

            case wheres_operators.includes: return { $in: [value, field] };
            // case wheres_operators.all: return { $allElementsTrue: [{ $in: [field, value] }] }; // todo: write $all filter
        }
    }
};


module.exports = {
    operator_to_mongo_query,
    operator_to_mongo_filter_query,
};
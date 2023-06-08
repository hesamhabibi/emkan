module.exports = {
    'title': ['required', 'string'],
    'postal_code': ['required', 'digits:10'],
    'city_id': ['required','integer'],
    'state_id': ['required','integer'],
    'address': 'string',
    // 'location': 'json', // todo: validation location
    'is_default': 'boolean',
};
const exists = require('./exists');
const unique = require('./unique');
const recaptcha = require('./recaptcha');
const file = require('./file');
const media = require('./media');
const in_validator = require('./in');
const min = require('./min');
const digits = require('./digits');
const required = require('./required');
const email = require('./email');
const boolean = require('./boolean');
const mobile = require('./mobile');
const timestamp = require('./timestamp');
const multilang = require('./multilang');
const multilang_required = require('./multilang_required');

module.exports = {
    exists,
    unique,
    recaptcha,
    file,
    media,
    in_validator,
    min,
    digits,
    required,
    email,
    boolean,
    mobile,
    timestamp,
    multilang,
    multilang_required,
};
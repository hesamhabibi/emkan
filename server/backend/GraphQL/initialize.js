const Validatorjs = require('validatorjs');
const fa_validatorJS = require('@common/lang/fa_validatorJS');
const { exists, unique, recaptcha, file, media, in_validator, mobile, timestamp, email, multilang, multilang_required } = require('@helpers/validationRules');

module.exports = () => {

    Validatorjs.registerAsync('exists', exists);
    Validatorjs.registerAsync('unique', unique);
    Validatorjs.registerAsync('recaptcha', recaptcha);
    Validatorjs.registerAsync('file', file);
    Validatorjs.registerAsync('media', media);
    Validatorjs.registerAsync('in', in_validator);
    Validatorjs.registerAsync('mobile', mobile);
    Validatorjs.registerAsync('timestamp', timestamp);
    // Validatorjs.registerAsync('min', min);
    // Validatorjs.registerAsync('digits', digits);
    // Validatorjs.registerAsync('required', required);
    Validatorjs.registerAsync('email', email);
    // Validatorjs.registerAsync('boolean', boolean);
    Validatorjs.registerAsync('multilang', multilang);
    Validatorjs.registerAsync('multilang_required', multilang_required);

    // set validation error messages
    Validatorjs.setMessages('fa', fa_validatorJS);

    // local will set in context
};
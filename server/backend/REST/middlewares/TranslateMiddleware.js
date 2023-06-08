const Validatorjs = require('validatorjs');
const TranslateHelper = require('@helpers/TranslateHelper');
const fa_validatorJS = require('@common/lang/fa_validatorJS');
const Cookies = require('cookies');
const { exists, unique, recaptcha, file, media, in_validator, mobile, timestamp, email, multilang, multilang_required } = require('@helpers/validationRules');

module.exports = async (req, res, next) => {

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

    // get cookies
    const cookies = new Cookies(req, res);

    // set local:
    const local = await cookies.get('lang') || process.env.APP_LOCAL || 'en';
    Validatorjs.useLang(local);
    TranslateHelper.set_local(local);
    Validatorjs.setAttributeFormatter((attribute) => {
        return TranslateHelper.trans(TranslateHelper.attr_formatter(attribute));
    });

    return next();
};
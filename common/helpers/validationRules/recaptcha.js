const axios = require('axios');
const { trans } = require('../TranslateHelper');

/*
examples:
'recaptcha'
*/

module.exports = async (value, attribute, req, passes) => {
    let pass = true;
    try {
        // todo: for debug:
        if (value === 'skip' || parseInt(process.env.VERCEL_MODE, 10))
            pass = true;
        else if (!value)
            pass = false;
        else {
            const path = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${value}`;
            const result = await axios.post(path);

            if (result.status === 200 && result.data.success === true && result.data.score > 0.5)
                pass = true;
            else
                pass = false;
        }
    } catch {
        pass = false;
    }

    return new Promise((resolve) => {
        if (pass) { resolve(passes()); }
        else { resolve(passes(false, trans('recaptcha_error'))); }
    });

};
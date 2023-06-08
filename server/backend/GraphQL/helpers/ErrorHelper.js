/* eslint-disable no-else-return */
const { trans } = require('@helpers/TranslateHelper');

const get_error_errors = (err) => {
    let errors;
    try {
        errors = err.extensions.exception.errors;
        if (!errors)
            errors = { default_error: [err.message] };
    } catch {
        try {
            errors = err.errors;
        } catch {
            errors = null;
        }
    }
    if (!errors)
        errors = { default_error: [err.message] };
    return errors;
};

const get_error_code = (err) => {
    let code;
    try {
        code = err.extensions.exception.code;
    } catch {
        try {
            code = err.code;
        } catch {
            code = null;
        }
    }

    if (!code) {
        try {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED': code = process.env.ERROR_CODE_AUTHENTICATE; break;
                case 'FORBIDDEN': code = process.env.ERROR_CODE_FORBIDDEN; break;
                case 'GRAPHQL_VALIDATION_FAILED': code = process.env.ERROR_CODE_GRAPHQL_VALIDATION; break;
                case 'BAD_USER_INPUT': code = process.env.ERROR_CODE_VALIDATION; break;
                case 'INTERNAL_SERVER_ERROR': code = process.env.ERROR_CODE_SERVER_ERROR; break;
                default: code = process.env.ERROR_CODE_UNKNOWN; break;
            }
        } catch {
            code = process.env.ERROR_CODE_UNKNOWN;
        }
    }
    return code;
};

const formatError = (err, debug = true) => { // for debug
    try {
        if (debug)
            console.log(err);

        let is_custom = false;
        try {
            try {
                is_custom = err.extensions.exception.is_custom;
            } catch {
                is_custom = false;
            }
            if (!is_custom) {
                try {
                    is_custom = err.is_custom;
                } catch {
                    is_custom = false;
                }
            }
        } catch {
            is_custom = false;
        }

        if (is_custom) {
            let path;
            try { path = err.path; }
            catch { path = null; }

            let message;
            try { message = err.message; }
            catch { message = trans('server_error'); }

            const errors = get_error_errors(err);
            const code = get_error_code(err);

            return { path, message, errors, code };
        } else {
            if (parseInt(process.env.DEBUG_MODE, 10))
                return {
                    path: err.path,
                    message: err.message,
                    errors: get_error_errors(err),
                    code: get_error_code(err),
                };
            else
                return {
                    path: null,
                    message: trans('server_error'),
                    errors: { default_error: trans('server_error') },
                    code: process.env.ERROR_CODE_UNKNOWN,
                };
        }
    } catch {
        return { path: null, message: trans('server_error'), errors: { default_error: trans('server_error') }, code: process.env.ERROR_CODE_UNKNOWN };
    }
};

const error_res_return = (message, errors = null, code = process.env.ERROR_CODE_VALIDATION) => {
    const err = new Error(message || trans('server_error'));
    err.is_custom = true;
    if (errors)
        err.errors = errors;
    else
        err.errors = { default_error: [message || trans('server_error')] };
    if (message !== undefined)
        err.code = code;
    else
        err.code = process.env.ERROR_CODE_SERVER_ERROR;
    return err;
};

const error_res = (message, errors = null, code = process.env.ERROR_CODE_VALIDATION) => {
    throw error_res_return(message, errors, code);
};

module.exports = {
    get_error_errors,
    get_error_code,
    formatError,
    error_res_return,
    error_res,
};
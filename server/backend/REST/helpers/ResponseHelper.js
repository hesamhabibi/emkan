const { trans } = require('@helpers/TranslateHelper');

const statuses = {
    success: 'success',
    error: 'error',
    warning: 'warning',
};

const api_res = (res, data = null, message = null, errors = null, status = statuses.success, code = process.env.ERROR_CODE_SERVER_ERROR) => {
    const result = {
        success: (status === statuses.success || status === statuses.warning),
        status,
        data,
        errors,
        message,
    };
    res.status(code).json(result);
    return result;
};

const api_res_data = (res, data, code = process.env.SUCCESS_STATUS_CODE) => {
    return api_res(res, data, null, null, statuses.success, code);
};

const api_res_err = (res, message, code = process.env.ERROR_CODE_SERVER_ERROR) => {
    return api_res(res, null, message, null, statuses.error, code);
};

const api_res_val_err = (res, message, errors, code = process.env.ERROR_CODE_VALIDATION) => {
    return api_res(res, null, message, errors, statuses.error, code);
};

const get_status_code = (error) => {
    let code;
    try {
        code = parseInt(error.code, 10);
        if (!code) {
            if (error.code === 'LIMIT_FILE_SIZE')
                code = process.env.ERROR_CODE_VALIDATION;
            else
                code = process.env.ERROR_CODE_UNKNOWN;
        }
    } catch {
        code = process.env.ERROR_CODE_SERVER_ERROR;
    }
    return code;
};

const onError = (error, req, res) => {
    let message;
    let errors;

    try {
        message = error.message;
    } catch {
        message = trans('server_error');
    }

    try {
        errors = error.errors;
    } catch {
        errors = null;
    }

    if (!errors) {
        errors = { default_error: [message] };
    }

    const code = get_status_code(error);
    return api_res_val_err(res, message, errors, code);
};

const onNoMatch = (req, res) => {
    return api_res_err(res, trans('method_not_allowed', { attr: req.method }), process.env.ERROR_CODE_UNKNOWN);
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

const throw_error_res = (message, errors = null, code = process.env.ERROR_CODE_VALIDATION) => {
    throw error_res_return(message, errors, code);
};

module.exports = {
    statuses,
    api_res,
    api_res_data,
    api_res_err,
    api_res_val_err,
    get_status_code,
    onError,
    onNoMatch,
    error_res_return,
    throw_error_res,
};
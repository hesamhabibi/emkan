const ResponseHelper = require('../helpers/ResponseHelper');
const Report = require('@models/ReportModel');
const path = require('path');

module.exports = async (err, req, res, next) => {
    let response;
    if (err.is_custom) {
        response = ResponseHelper.api_res_val_err(res, err.message, err.errors, err.code);
    } else {
        if (parseInt(process.env.DEBUG_MODE, 10))
            console.error(err);
        response = ResponseHelper.onError(err, req, res);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // create Report
    try {
        const filter_keys = [
            'password',
            'password_confirmation',
        ];
        const go_deeper = (obj, parent_key) => {
            try {
                if (typeof obj === 'object') {
                    const keys = Object.keys(obj);
                    for (let i = 0; i < keys.length; i += 1)
                        obj[keys[i]] = go_deeper(obj[keys[i]], keys[i]);
                    return obj;
                }
                if (filter_keys.includes(parent_key))
                    return null;
                return obj;
            } catch {
                return obj;
            }
        };

        const filtered_args = go_deeper({
            body: req.body,
            file: req.file,
            files: req.files,
            query: req.query,
        });

        const report = {};

        let ip_split = [];
        try {
            ip_split = req.ip.split(':');
        } catch (e) {
            console.log(e);
        }
        report.device_info = {
            ip: req.ip,
            ipv4: ip_split[ip_split.length - 1],
            user_agent: req.headers['User-Agent'],
        };

        report.action = req.url;
        report.parameters = filtered_args;
        report.department = Report.departments.backend;
        err.stack = err.stack.replace(RegExp(`${path.resolve('.')}`, 'ig'), '~');
        // err.error_message = err.message;
        // err.error_name = err.name;
        // err.error_stack = err.stack;
        report.error = JSON.stringify(err);
        report.response = JSON.stringify(response);
        report.action_type = Report.action_types.restful;
        try {
            report.user_id = req.AuthUser.id;
        } catch (e) {
            report.user_id = null;
        }

        try {
            report.status_code = ResponseHelper.get_status_code(err);
        } catch {
            report.status_code = null;
        }
        await Report.ReportModel.create(report);
    } catch (e) {
        console.log('ErrorHandlerMiddleware.js:', e);
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    return next();
};
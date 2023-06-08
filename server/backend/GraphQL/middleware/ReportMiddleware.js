const path = require('path');
const Report = require('@common/models/ReportModel');
const ErrorHelper = require('../helpers/ErrorHelper');

module.exports = async (resolve, parent, args, context, info) => {

    if (parseInt(process.env.SAVE_REPORT_IN_DATABASE, 10))
        if (parent === undefined) {
            const result = await resolve(parent, args, context, info);
            // after
            const report = {};
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

                const filtered_args = go_deeper(args);

                if (result instanceof Error) { // error occurred
                    let ip_split = [];
                    try {
                        ip_split = context.req.ip.split(':');
                    } catch (e) {
                        console.log(e);
                    }
                    report.device_info = {
                        ip: context.req.ip,
                        ipv4: ip_split[ip_split.length - 1],
                        user_agent: context.req.headers['User-Agent'],
                    };

                    report.action = info.fieldName;
                    report.parameters = filtered_args;
                    report.department = Report.departments.backend;

                    report.error = JSON.stringify({ message: result.message, name: result.name, stack: result.stack.replace(RegExp(`${path.resolve('.')}`, 'ig'), '~') });
                    const response = ErrorHelper.formatError(result, false);
                    report.response = JSON.stringify(response);

                    if (String(info.parentType) === 'Mutation')
                        report.action_type = Report.action_types.mutation;
                    else if (String(info.parentType) === 'Query')
                        report.action_type = Report.action_types.query;
                    else
                        report.action_type = Report.action_types.unknown;

                    try {
                        report.user_id = context.AuthUser.id;
                    } catch {
                        report.user_id = null;
                    }

                    try {
                        report.status_code = response.code || 500;
                    } catch {
                        report.status_code = null;
                    }
                } else { // success query
                    let ip_split = [];
                    try {
                        ip_split = context.req.ip.split(':');
                    } catch (e) {
                        console.log(e);
                    }
                    report.device_info = {
                        ip: context.req.ip,
                        ipv4: ip_split[ip_split.length - 1],
                        user_agent: context.req.headers['User-Agent'],
                    };

                    report.action = info.fieldName;
                    report.parameters = filtered_args;
                    report.error = null;
                    report.response = null;
                    report.status_code = 200;
                    report.department = Report.departments.backend;

                    if (String(info.parentType) === 'Mutation')
                        report.action_type = Report.action_types.mutation;
                    else if (String(info.parentType) === 'Query')
                        report.action_type = Report.action_types.query;
                    else
                        report.action_type = Report.action_types.unknown;

                    try {
                        report.user_id = context.AuthUser.id;
                    } catch {
                        report.user_id = null;
                    }
                }
                await Report.ReportModel.create(report);
            } catch (e) {
                console.log('ReportMiddleware.js:', e);
            }

            return result;
        }
    return resolve(parent, args, context, info);
};
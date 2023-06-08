const Report = require('@models/ReportModel');

module.exports = async (req, res, next) => {
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
        } catch {/* empty */}

        report.device_info = {
            ip: req.ip,
            ipv4: ip_split[ip_split.length - 1],
            user_agent: req.headers['user-agent'],
        };

        report.action = req.url;
        report.parameters = filtered_args;
        report.error = null;
        report.response = null;
        report.status_code = 200;
        report.department = Report.departments.backend;
        report.action_type = Report.action_types.restful;
        try {
            report.user_id = req.AuthUser.id;
        } catch (e) {
            report.user_id = null;
        }

        await Report.ReportModel.create(report);
    } catch (e) {
        console.log('ReportMiddleware.js:', e);
    }

    return next();
};
const mongoose = require('mongoose');
const Report = require('@models/ReportModel');

module.exports = async (req, res, next) => {
    try {

        if (String(process.env.SAVE_REPORT_IN_DATABASE) == '0') {
            return next();
        }

        if (!mongoose.connection.readyState) {
            try {
                if (!mongoose.connection.readyState) {
                    db = await mongoose.connect(process.env.MONGO_DB_URI, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                        useFindAndModify: false,
                        serverSelectionTimeoutMS: parseInt(process.env.MONGO_DB_CONNECTION_TIMEOUT),
                    });
                }
            } catch (e) {
                console.log(e);
                console.log('ReportMiddleware.js:', 'database connection failed');
                return next();
            }
        }

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
            // console.log(e);
        }

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
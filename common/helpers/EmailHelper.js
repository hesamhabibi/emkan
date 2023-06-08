/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const nodemailer = require('nodemailer');

const helper_connect_transporter = async () => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    return transporter;
};
const helper_send_email = async (transporter, email, subject, message, from, is_html) => {
    const options = {
        from,
        to: email,
        subject,
    };
    if (is_html)
        options.html = message;
    else
        options.text = message;

    return transporter.sendMail(options);
};

const send_email_html = async (email, subject, message, from_email = null) => {
    let transporter;
    try {
        transporter = await helper_connect_transporter();
    } catch (e) {
        return {
            success: false,
            result: null,
            e,
            here: true,
        };
    }

    try {
        if (!from_email) {
            from_email = process.env.MAIL_FROM_ADDRESS;
        }
        const result = await helper_send_email(transporter, email, subject, message, from_email, true);
        return {
            success: true,
            result,
        };
    } catch (e) {
        return {
            success: false,
            result: null,
            e,
        };
    }
};

const send_email_array_html = async (emails, subjects, messages, froms = null) => {
    let transporter;
    try {
        transporter = await helper_connect_transporter();
    } catch (e) {
        return {
            success: false,
            report: {
                all_success: false,
                total: emails.length,
                success_count: 0,
                error_count: emails.length,
            },
            result: null,
        };
    }
    let error_count = 0;
    const results = [];
    for (let i = 0; i < emails.length; i += 1) {
        let subject;
        if (typeof subjects === 'string') {
            subject = subjects;
        } else {
            subject = subjects[i];
        }
        let from;
        if (!froms) {
            from = process.env.MAIL_FROM_ADDRESS;
        } else if (typeof froms === 'string') {
            from = froms;
        } else {
            from = froms[i];
        }
        let message;
        if (typeof messages === 'string') {
            message = messages;
        } else {
            message = messages[i];
        }

        try {
            const result = await helper_send_email(transporter, emails[i], subject, message, from, true);
            results.push({
                success: true,
                email: emails[i],
                result
            });
        } catch (e) {
            error_count += 1;
            results.push({
                success: false,
                email: emails[i],
                result: {
                    subject,
                    message,
                    from,
                    error_message: e.message,
                },
            });
        }
    }
    return {
        success: (emails.length - error_count) > 0,
        report: {
            all_success: error_count === 0,
            total: emails.length,
            success_count: emails.length - error_count,
            error_count,
        },
        result: results,
    };
};

module.exports = {
    send_email_html,
    send_email_array_html,
};
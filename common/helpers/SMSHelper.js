/* eslint-disable no-param-reassign */
const axios = require('axios');

const mobile_regex = RegExp(/^[0]{1}[9]{1}[0-9]{9}$/);

const send_by_template = async (template, mobile, token, token2, token3) => {

    try {
        const api_verify_url = `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/verify/lookup.json`;
        if (!mobile_regex.test(mobile))
            return false;

        const result = await axios({
            method: "POST",
            url: api_verify_url,
            params: {
                receptor: mobile,
                token,
                token2,
                token3,
                template,
                type: 'sms',
            }
        });

        if (result.status === 200) {
            return true;
        }
    } catch (e) {
        console.log('SMSHelper', e?.response?.data);
    }
    return false;

};

const send_array = async (mobiles, messages, senders, date) => {
    try {
        const api_send_array_url = `https://api.kavenegar.com/v1/${process.env.KAVENEGAR_API_KEY}/sms/sendarray.json`;

        if (typeof messages === "string") {
            const text = encodeURIComponent(messages);
            messages = [];
            for (let i = 0; i < mobiles.length; i += 1)
                messages.push(text);
        } else if (Array.isArray(messages)) {
            for (let i = 0; i < messages.length; i += 1)
                messages[i] = encodeURIComponent(messages[i]);
        }

        if (!senders)
            senders = process.env.SMS_SENDER_NUMBER;
        if (typeof senders === "string") {
            const sender = senders;
            senders = [];
            for (let i = 0; i < mobiles.length; i += 1)
                senders.push(sender);
        }

        for (let i = 0; i < mobiles.length; i += 1)
            if (!mobile_regex.test(mobiles[i]))
                return {
                    success: null,
                    result: null,
                };

        if (mobiles.length !== messages.length)
            return {
                success: null,
                result: null,
            };
        if (mobiles.length !== senders.length)
            return {
                success: null,
                result: null,
            };

        const params = {
            receptor: JSON.stringify(mobiles),
            sender: JSON.stringify(senders),
            message: JSON.stringify(messages),
        };

        try {
            if (date)
                params.date = String(Math.round(date / 1000) + 4.5 * 60 * 60 + 3); // convert millisecond to second
        } catch {
            console.log('no date');
        }

        const result = await axios({
            method: "POST",
            url: api_send_array_url,
            params
        });

        if (result.status === 200) {
            return {
                success: true,
                result,
            };
        }
        return {
            success: false,
            result,
        };
    } catch (e) {
        console.log('SMSHelper', e);
        return {
            success: null,
            result: null,
        };
    }
};

const send_verify_code = async (mobile, token) => {
    return send_by_template('send-verify-code-register-code', mobile, token);
};

module.exports = {
    send_by_template,
    send_array,
    send_verify_code,
};
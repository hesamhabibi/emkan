const axios = require('axios');

const firebase_url_send_push_notification = 'https://fcm.googleapis.com/fcm/send';

const send_push_notification = async (tokens, { title, body, icon, click_action }) => {
    try {
        const fields = {
            // 'to': tokens,
            // 'registration_ids': tokens,
            'notification': {
                'body': body,
                'title': title,
                'icon': icon,
                'click_action': click_action,
            }
        };

        if (Array.isArray(tokens)) {
            fields.registration_ids = tokens;
        } else {
            fields.to = tokens;
        }

        const header = {
            'Authorization': process.env.NOTIFICATION_AUTHORIZATION_KEY,
            'Content-type': 'application/json',
        };

        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, firebase_url_send_push_notification);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

        const result = await axios.post(firebase_url_send_push_notification, fields, {
            headers: header,
        });

        return {
            success: true,
            data: result.data,
        };
    } catch {
        return {
            success: false,
            data: null
        };
    }
};

module.exports = {
    send_push_notification,
};
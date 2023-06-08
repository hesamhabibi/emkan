/* eslint-disable no-await-in-loop */
const SMSHelper = require('@helpers/SMSHelper');
const EmailHelper = require('@helpers/EmailHelper');
const PushNotificationHelper = require('@helpers/PushNotificationHelper');
const { TaskModel, CRMModel, UserModel } = require('@models');

const helper_check_mondodb_connection = async () => {
    // todo: write this function
};

const task_send_sms_array = async (task) => {
    const crm = await CRMModel.findById(task.data.crm_id);
    const mobiles = [];
    for (let i in crm.send_to) {
        const send_to_item = crm.send_to[i];
        let user;
        try {
            user = await UserModel.findById(send_to_item.receiver_user_id);
        } catch {
            user = null;
        }
        if (user && user.mobile) {
            mobiles.push(user.mobile);
        } else {
            if (send_to_item.receiver_value && typeof send_to_item.receiver_value === 'string' && send_to_item.receiver_value.length == 11) {
                mobiles.push(send_to_item.receiver_value);
            }
        }
    }
    const result = await SMSHelper.send_array(mobiles, crm.message, process.env.SMS_SENDER_NUMBER);

    await crm.update({
        status: result.success ? CRMModel.statuses.success : CRMModel.statuses.reject,
        response: result.success === null ? null : result.result.data,
    });
    await task.update({
        done: true,
    });
};

const task_send_email_array = async (task) => {
    const crm = await CRMModel.findById(task.data.crm_id);
    const emails = [];
    for (let i in crm.send_to) {
        const send_to_item = crm.send_to[i];
        let user;
        try {
            user = await UserModel.findById(send_to_item.receiver_user_id);
        } catch {
            user = null;
        }
        if (user && user.email) {
            emails.push(user.mobile);
        } else {
            if (send_to_item.receiver_value && typeof send_to_item.receiver_value === 'string' && send_to_item.receiver_value.includes('@')) {
                emails.push(send_to_item.receiver_value);
            }
        }
    }
    const result = await EmailHelper.send_email_array_html(emails, crm.title, crm.message);

    await crm.update({
        status: result.success ? CRMModel.statuses.success : CRMModel.statuses.reject,
        response: result.success === null ? null : result.result,
    });
    await task.update({
        done: true,
    });
};

const task_send_push_notification_array = async (task) => {
    const crm = await CRMModel.findById(task.data.crm_id);
    const google_tokens = [];
    for (let i in crm.send_to) {
        const send_to_item = crm.send_to[i];
        let user;
        try {
            user = await UserModel.findById(send_to_item.receiver_user_id);
        } catch {
            user = null;
        }
        if (user && Array.isArray(user.push_notifications) && user.push_notifications.length > 0) {
            for (let j in user.push_notifications)
                if (user.push_notifications[j].driver === UserModel.push_notification_drivers.google)
                    google_tokens.push(user.push_notifications[j].key);
        }
    }
    const result = await PushNotificationHelper.send_push_notification(crm.send_to, {
        title: crm.title,
        body: crm.message,
        icon: null, // todo: add icon and click action
        click_action: null,
    });

    await crm.update({
        status: result.success ? CRMModel.statuses.success : CRMModel.statuses.reject,
        response: result.success === null ? null : result.result,
    });
    await task.update({
        done: true,
    });
};

const helper_do_task = async (task) => {

    const task_type = task.type;

    switch (task_type) {
        case TaskModel.types.send_sms_array:
            await task_send_sms_array(task);
            break;
        case TaskModel.types.send_email_array:
            await task_send_email_array(task);
            break;
        case TaskModel.types.send_push_notification_array:
            await task_send_push_notification_array(task);
            break;
        default:
            console.log('task type unknown');
    }
    return true;
};

const run_tasks = async () => {
    try {
        await helper_check_mondodb_connection();

        const tasks = await TaskModel.find({ done: { "$ne": true } });
        for (let i = 0; i < tasks.length; i += 1) {
            try {
                if (tasks[i].date < Date.now())
                    await helper_do_task(tasks[i]);
            } catch (e) {
                // console.log('error in doing task', e);
            }
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    run_tasks,
};

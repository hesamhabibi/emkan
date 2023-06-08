const env_keys = {
    '#MONGO_DB_USERNAME': 'iportalusr',
    '#MONGO_DB_PASSWORD': '7HiMT+EJYdmFZSv79AJ6lg==',
    '#MONGO_DB_HOST': '79.175.134.129',
    '#MONGO_DB_PORT': '27017',
    '#MONGO_DB_DATABASE': 'iportal_db',
    '#MONGO_DB_OPTIONS': 'authSource=admin',
    '#MONGO_DB_URI': 'mongodb://$MONGO_DB_USERNAME:$MONGO_DB_PASSWORD@$MONGO_DB_HOST:$MONGO_DB_PORT/$MONGO_DB_DATABASE?$MONGO_DB_OPTIONS',
    MONGO_DB_URI: 'mongodb://127.0.0.1:27017/iportal_db',
    '##MONGO_DB_URI': 'mongodb+srv://iportal_admin:n7yqj6dQKaexp3G55@iportal-cluster-v1.hwl5t.mongodb.net/iportal_db?retryWrites=true&w=majority', // comment

    // MAILs:
    '#MAIL': "EmailHelper",
    MAIL_HOST: 'smtp.gmail.com',
    MAIL_PORT: '266',
    MAIL_USERNAME: 'majidshishegar0@gmail.com',
    MAIL_PASSWORD: '1234',
    MAIL_FROM_ADDRESS: 'majidshishegar0@gmail.com',

    SECRET: '',
    JWT_KEY: '',
    JWT_EXPIRE_IN: '1y',
    '#REFRESH_TOKEN_IN': '10 * 60 * 1000 = 600000 = 10 min',
    REFRESH_TOKEN_IN: '600000',
    '#COOKIE_EXPIRE_IN': '2,592,000,000 = 30 days', // comment
    COOKIE_EXPIRE_IN: '2592000000',
    PASSWORD_SALT_ROUNDS: '8',

    // # [fa, en]
    '#APP_LOCAL': '[fa, en]', // comment
    APP_LOCAL: 'fa',

    // # file manger
    PUBLIC_UPLOAD_FOLDER: 'public/',
    PUBLIC_UPLOAD_DIR: 'upload/',
    PRIVATE_UPLOAD_FOLDER: 'storage/',
    PRIVATE_UPLOAD_DIR: 'upload/',

    DEFAULT_PER_PAGE: '15',

    GRAPHQL_TIMEOUT: '30s',
    MONGO_DB_CONNECTION_TIMEOUT: '1000',

    '#error codes': ':', // comment
    SUCCESS_STATUS_CODE: 200,
    ERROR_CODE_AUTHENTICATE: 401,
    ERROR_CODE_FORBIDDEN: 403,
    ERROR_CODE_NOTFOUND: 404,
    ERROR_CODE_GRAPHQL_VALIDATION: 422,
    ERROR_CODE_VALIDATION: 422,
    ERROR_CODE_SERVER_ERROR: 500,
    ERROR_CODE_UNKNOWN: 500,

    // # in milliseconds, 30 min = 30 * 60 * 1000 = 1,800,000
    '#RESET_PASSWORD_EXPIRE_IN': 'in milliseconds, 30 min = 30 * 60 * 1000 = 1,800,000', // comment
    RESET_PASSWORD_EXPIRE_IN: '1800000',
    LOGIN_VERIFY_TOKEN_EXPIRE_IN: '1800000',

    SMS_SENDER_NUMBER: '1000596446',
    KAVENEGAR_API_KEY: '665A756D50484F6448616F30773453626D4F356B397073315267547A6279535651485449654F67364E4D6F3D',

    NOTIFICATION_AUTHORIZATION_KEY: 'key=AAAA1ohw7Lc:APA91bGN9mDds-rF3ZjSDKN0NIelDsKHcmGaix8FbeJVENdTm5qqmIYLso4KUxaTd9C4D_bm3HIUF_ZQmj2wv6vJdusA5lj8JC7fmIV5TewQ9JYKaS3apl9YozfBNpeLg2ldMfuvu5FN',

    SITE_KEY: '6LcDY6kaAAAAAF6bkbnGjxZ7Asamn8f-Gd7e_1K2',
    SECRET_KEY: '6LcDY6kaAAAAAHom58kJRNphPYnWAIIARkz0UZW2',

    SAVE_REPORT_IN_DATABASE: '1',
    VERCEL_MODE: '1',
    DEBUG_MODE: '1',

    DEVELOPER_ACCESS_ID: '607df1ebaccf750cc894a5a7',

    GATEWAY_MELAT_TERMINAL_ID: '1817',
    GATEWAY_MELAT_USER_NAME: 'user1817',
    GATEWAY_MELAT_USER_PASSWORD: '60855214',
    GATEWAY_MELAT_SANDBOX: '1',

};

const local_env_keys_replace = {
    VERCEL_MODE: '0', // turn off vercel mode
};

module.exports = {
    env_keys,
    local_env_keys_replace,
};
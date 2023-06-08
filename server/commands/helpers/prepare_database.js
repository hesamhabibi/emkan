/* eslint-disable no-console */
/* eslint-disable no-empty */
/* eslint-disable no-restricted-syntax */

const mongoose = require('mongoose');
const load_env = require('./load_env');

module.exports = async () => {
    let MONGO_DB_URI;
    let MONGO_DB_CONNECTION_TIMEOUT;
    let db;

    try {
        const local_env = await load_env('.env.local');
        if (local_env.MONGO_DB_URI)
            MONGO_DB_URI = local_env.MONGO_DB_URI;
        if (local_env.MONGO_DB_CONNECTION_TIMEOUT)
            MONGO_DB_CONNECTION_TIMEOUT = local_env.MONGO_DB_CONNECTION_TIMEOUT;
    } catch { /* empty */ }

    try {
        if (!MONGO_DB_URI) {
            const env = await load_env('.env');
            if (env.MONGO_DB_URI)
                MONGO_DB_URI = env.MONGO_DB_URI;
            if (env.MONGO_DB_CONNECTION_TIMEOUT)
                MONGO_DB_CONNECTION_TIMEOUT = env.MONGO_DB_CONNECTION_TIMEOUT;
        }
    } catch { /* empty */ }

    if (!MONGO_DB_URI) {
        console.log('cant find "MONGO_DB_URI" in env file');
        return false;
    }

    try {
        db = await mongoose.connect(MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            serverSelectionTimeoutMS: parseInt(MONGO_DB_CONNECTION_TIMEOUT),
        });
    } catch (e) {
        console.log('database connection failed');
        return false;
    }
    if (!db.connections[0].readyState) {
        console.log('database connection failed');
        return false;
    }
    
    console.log('connected to database');
    return true;
};
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const models = require('@models');
const load_env = require('../helpers/load_env');

let db;
const prepare = async () => { // todo: use helper
    let MONGO_DB_URI;

    try {
        const local_env = await load_env('.env.local');
        if (local_env.MONGO_DB_URI)
            MONGO_DB_URI = local_env.MONGO_DB_URI;
    } catch (e) {
        console.log(e);
    }

    try {
        if (!MONGO_DB_URI) {
            const env = await load_env('.env');
            if (env.MONGO_DB_URI)
                MONGO_DB_URI = env.MONGO_DB_URI;
        }
    } catch (e) {
        console.log(e);
    }

    if (!MONGO_DB_URI) {
        console.log('cant find "MONGO_DB_URI" in env file');
        return false;
    }

    try {
        db = await mongoose.connect(MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (e) {
        console.log(e);
        console.log('database connection failed');
        return false;
    }
    if (db.connections[0].readyState)
        console.log('connected to database');
    else {
        console.log('database connection failed');
        return false;
    }
    return true;
};

const finish = async () => {
    await db.disconnect();
};

module.exports = async (skip = []) => {

    if (await prepare()) {
        const keys = Object.keys(models);
        const backup_data = {};
        for (let i = 0; i < keys.length; i += 1) {
            const model = models[keys[i]];
            if (!skip.includes(model.modelName)) {
                const docs = await model.find({});
                if (docs.length > 0)
                    backup_data[model.modelName] = docs;
            }
        }

        const backup_data_keys = Object.keys(backup_data);

        const dir = path.resolve(`./commands/databaseBackup/data/`);
        fs.rmdirSync(dir, { recursive: true });
        mkdirp.sync(dir);

        for (let i = 0; i < backup_data_keys.length; i += 1) {
            console.log(`saving ${backup_data_keys[i]}`);
            const p = path.join(dir, `${backup_data_keys[i]}.json`);
            const fd = fs.openSync(p, 'w');
            fs.writeFileSync(fd, JSON.stringify(backup_data[backup_data_keys[i]]));
        }
        await finish();
        console.log('backup finished');
        return true;
    }
    console.log('error in backup');
    return false;
};
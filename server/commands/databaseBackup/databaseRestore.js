const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

require('@models');
const load_env = require('../helpers/load_env');

let db;
const prepare = async () => {
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

module.exports = async () => {

    if (await prepare()) {

        const dir = path.resolve(`./commands/databaseBackup/data/`);

        const file_list = fs.readdirSync(dir);

        console.log(file_list);

        for (let i = 0; i < file_list.length; i += 1) {
            try {
                const model_name = file_list[i].replace('.json', '');
                const model = mongoose.models[model_name];
                if (model) {
                    console.log(`restoring ${model_name}`);
                    const p = path.join(dir, file_list[i]);
                    const fd = fs.openSync(p, 'r');
                    const docs = JSON.parse(fs.readFileSync(fd));
                    console.log(`${docs.length} documents`);
                    await model.deleteMany({});
                    await model.insertMany(docs);
                }
            } catch (e) {
                console.log(e);
            }
        }
        await finish();

        console.log('restore done!');
        return true;
    }

    console.log('error in restore');
    return false;

};
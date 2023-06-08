require('module-alias/register');
const models = require('@models');

const prepare_database = require('../helpers/prepare_database');
const close_database = require('../helpers/close_database');

const run = async () => {
    const model = models[process.argv[2]];

    if (!(await prepare_database())) {
        console.log('error in prepare');
        return;
    }

    try {

        const query = JSON.parse(process.argv[3] || '[{"$match":{}}]') || [{$match:{}}];

        const result = await model.aggregate(query);

        console.log(result);
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log(JSON.stringify(result));
    } catch (e) {
        console.log(e);
        console.log('error');
    }

    await close_database();
    return;
};

run();
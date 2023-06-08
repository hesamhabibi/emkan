require('module-alias/register');
const seeder = require('./seeder');

const prepare_database = require('../helpers/prepare_database');
const close_database = require('../helpers/close_database');

const run = async () => {

    let type = 'soft';
    if (process.argv.includes('--hard'))
        type = 'hard';
    else if (process.argv.includes('--very_hard'))
        type = 'very_hard';

    console.log('seeding type:', type);

    let models = process.argv.filter((arg) => {
        return !arg.includes('/') && !arg.includes('--');
    });

    if (models.length <= 0) {
        models = null;
    } else {
        console.log('args:', models);
        console.log();
    }

    if (!(await prepare_database())) {
        console.log('error in prepare');
        return;
    }

    await seeder(type, models);

    await close_database();

    console.log('done');
};

run();
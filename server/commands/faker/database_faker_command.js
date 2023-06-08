require('module-alias/register');
const fakers = require('./fakers');

const prepare_database = require('../helpers/prepare_database');
const close_database = require('../helpers/close_database');

const add = async () => {
    const arg_model_names = process.argv.splice(3);

    if (arg_model_names.includes('product') || arg_model_names.includes('products')) {
        await fakers.product();
    }
    if (arg_model_names.includes('device') || arg_model_names.includes('devices')) {
        await fakers.device();
    }
    if (arg_model_names.includes('order') || arg_model_names.includes('orders')) {
        await fakers.order();
    }
    if (arg_model_names.includes('blog') || arg_model_names.includes('blogs')) {
        await fakers.blog();
    }
    if (arg_model_names.includes('service') || arg_model_names.includes('services')) {
        await fakers.service();
    }
    if (arg_model_names.includes('event') || arg_model_names.includes('events')) {
        await fakers.event();
    }
    if (arg_model_names.includes('ticket') || arg_model_names.includes('tickets')) {
        await fakers.ticket();
    }
};

const run = async () => {
    const type = process.argv[2];

    if (type == 'add') {
        if (!(await prepare_database())) {
            console.log('error in prepare');
            return;
        }

        await add();

        await close_database();
        return;
    }

    console.log(`\nUsage: faker [command] [..options]\nExample: faker add product\n\navailable commands:\n\tadd\n\ndescription: faker is a helper to add some fake data to database.\n`);
};

run();
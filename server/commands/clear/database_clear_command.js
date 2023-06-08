require('module-alias/register');
const models = require('@models');

const prepare_database = require('../helpers/prepare_database');
const close_database = require('../helpers/close_database');

const setting = async () => {
    const { SettingModel } = models;
    if (process.argv.length <= 3)
        console.log('please insert setting key to delete\n\tclear setting [...keys]\nexample: yarn clear setting web_logo_image');
    for (let i = 3; i < process.argv.length; i += 1) {
        try {
            const key = process.argv[i].trim();
            const result = await SettingModel.deleteMany({ key });
            if (result.deletedCount >= 1)
                console.log('> setting with "', key, '" key deleted');
        } catch {/* empty */ }
    }
};


const product = async () => {
    const { ProductModel } = models;
    let id = process.argv[3];
    // let ids = process.argv.filter((v, i) => i > 3);
    const product = await ProductModel.findById(id);
    const products = await ProductModel.find({});
    for (let i in products) {
        if (String(id) !== String(products[i]._id)) {
            products[i].has_variant = product.has_variant;
            products[i].variant = product.variant;
            products[i].mix_variant = product.mix_variant;
            await products[i].save();
        }
    }
};


const all = async () => {
    for (let i in models) {
        await models[i].deleteMany({});
    }
    console.log('done!');
};

const media_files = async () => {
    try {
        const path = require('path');
        const iportal_dir = path.resolve(path.join(process.cwd(), '..'));

        const fs = require('fs');
        try {
            await fs.rmdirSync(path.join(iportal_dir, '/server/public/upload'), { recursive: true });
        } catch {
            console.log('error in delete ./server/public/upload directory');
        }
        try {
            await fs.rmdirSync(path.join(iportal_dir, '/web_engine/public/upload'), { recursive: true });
        } catch {
            console.log('error in delete ./web_engine/public/upload directory');
        }
        console.log('done!');
    } catch (e) {
        console.log(e);
        console.log('error!');
    }
};

const run = async () => {
    const type = process.argv[2];

    if (type == 'product') {
        if (!(await prepare_database())) {
            console.log('error in prepare');
            return;
        }

        await product();

        await close_database();
        return;
    }

    if (type == 'setting') {
        if (!(await prepare_database())) {
            console.log('error in prepare');
            return;
        }

        await setting();

        await close_database();
        return;
    }
    if (type == 'all') {
        if (!(await prepare_database())) {
            console.log('error in prepare');
            return;
        }

        await all();

        await close_database();
        return;
    }

    if (type == 'media_files') {
        await media_files();
        return;
    }

    console.log(`\nUsage: clear [command] [..options]\nExample: clear all\n\navailable commands:\n\tall\n\tmedia_files\n\tsetting [...keys]\n\ndescription: clear command is a helper to clear database.\n`);
};

run();
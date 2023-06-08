
const access_seeder = require('./access_seed');
const settings_seed = require('./settings_seed');
const pages_seed = require('./pages_seed');
const panel_permissions_seed = require('./panel_permissions_seed');
const users_seeder = require('./users_seed');

module.exports = async (type = false, models = null) => {
    const start_time = Date.now();
    console.log('seeding started...');

    // seeds:
    if (models == null || models.includes('access') || models.includes('accesses')) {
        console.log('seeding accesses');
        await access_seeder(type);
    }
    if (models == null || models.includes('user') || models.includes('users')) {
        console.log('seeding users');
        await users_seeder(type);
    }
    if (models == null || models.includes('setting') || models.includes('settings')) {
        console.log('seeding settings');
        await settings_seed(type);
    }
    if (models == null || models.includes('page') || models.includes('pages')) {
        console.log('seeding pages');
        await pages_seed(type);
    }
    if (models == null || models.includes('panel_permission') || models.includes('panel_permissions')) {
        console.log('seeding panel permissions');
        await panel_permissions_seed(type);
    }

    console.log(`seed in ${Math.round((Date.now() - start_time) / 10) / 100} secs\n`);
};
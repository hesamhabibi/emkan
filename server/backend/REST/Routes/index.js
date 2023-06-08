const MediaRoutes = require('./MediaRoutes');
const CronJobRoutes = require('./CronJobRoutes');

const ttRoutes = require('./ttRoutes');

module.exports = [
    ['/media', MediaRoutes],
    ['cronjob', CronJobRoutes],

    ttRoutes,
];
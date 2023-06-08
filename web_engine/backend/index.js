const routeNames = require('./routeNames');
const interruptCodes = require('./interruptCodes');
const tags = require('./tags');
const filters = require('./filters');


const registerTagsAndFilters = async (engine) => {
    await filters(engine);
    await tags(engine);
    return true;
};


module.exports = {
    registerTagsAndFilters,
    routeNames,
    interruptCodes,
};
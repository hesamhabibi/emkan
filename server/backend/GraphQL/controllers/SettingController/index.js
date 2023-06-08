const typeDefs = require('./typeDefs.gql');

const getSettingByKey = require('./query/getSettingByKey');
const getSetting = require('./query/getSetting');
const getSettings = require('./query/getSettings');
const getAllSettings = require('./query/getAllSettings');
const getAllSettingGroups = require('./query/getAllSettingGroups');

const createSetting = require('./mutation/createSetting');
const updateSetting = require('./mutation/updateSetting');
const updateSettingByKey = require('./mutation/updateSettingByKey');
const deleteSetting = require('./mutation/deleteSetting');

const user = require('./relations/user');

const resolvers = {
    Query: {
        getSettingByKey,
        getSetting,
        getSettings,
        getAllSettings,
        getAllSettingGroups,
    },
    Mutation: {
        createSetting,
        updateSetting,
        updateSettingByKey,
        deleteSetting,
    },
    Setting: {
        user,
    }
};

const { rules: { access, allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getSettingByKey: allow,
        getSetting: access,
        getSettings: access,
        getAllSettings: access,
        getAllSettingGroups: allow,
    },
    Mutation: {
        createSetting: access,
        updateSetting: access,
        updateSettingByKey: access,
        deleteSetting: access,
    },
    Setting: {
        user: access,
    }
};

module.exports = { typeDefs, resolvers, permissions };
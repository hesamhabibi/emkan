const typeDefs = require('./typeDefs.gql');

const getReminder = require('./query/getReminder');
const getReminders = require('./query/getReminders');
const getAllReminders = require('./query/getAllReminders');
const getAllSelfReminders = require('./query/getAllSelfReminders');
const getRangeSelfReminders = require('./query/getRangeSelfReminders');

const createReminder = require('./mutation/createReminder');
const updateReminder = require('./mutation/updateReminder');
const deleteReminder = require('./mutation/deleteReminder');

const editable = require('./relations/editable');
const is_owner = require('./relations/is_owner');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getReminder,
        getReminders,
        getAllReminders,
        getAllSelfReminders,
        getRangeSelfReminders,
    },
    Mutation: {
        createReminder,
        updateReminder,
        deleteReminder,
    },
    Reminder: {
        is_owner,
        editable,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getReminder: access,
        getReminders: access,
        getAllReminders: access,
        getAllSelfReminders: access,
        getRangeSelfReminders: access,
    },
    Mutation: {
        createReminder: access,
        updateReminder: access,
        deleteReminder: access,
    },
    // Reminder: {
    //     is_owner: access
    //     editable: access
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
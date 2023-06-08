const typeDefs = require('./typeDefs.gql');

const getAccess = require('./query/getAccess');
const getAccesses = require('./query/getAccesses');
const getAllAccesses = require('./query/getAllAccesses');
const getAccessIdsByAccess = require('./query/getAccessIdsByAccess');

const createAccess = require('./mutation/createAccess');
const updateAccess = require('./mutation/updateAccess');
const deleteAccess = require('./mutation/deleteAccess');

const accessControlLists = require('./relations/accessControlLists');
const users = require('./relations/users');

const resolvers = {
    Query: {
        getAccess,
        getAccesses,
        getAllAccesses,
        getAccessIdsByAccess,
    },
    Mutation: {
        createAccess,
        updateAccess,
        deleteAccess,
    },
    Access: {
        accessControlLists,
        users,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAccess: access,
        getAccesses: access,
        getAllAccesses: access,
        getAccessIdsByAccess: access,
    },
    Mutation: {
        createAccess: access,
        updateAccess: access,
        deleteAccess: access,
    },
    // Access: {
    //     accessControlLists: access,
    //     users: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
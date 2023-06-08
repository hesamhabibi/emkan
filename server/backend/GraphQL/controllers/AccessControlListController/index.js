const typeDefs = require('./typeDefs.gql');

const getAccessControlList = require('./query/getAccessControlList');
const getAccessControlLists = require('./query/getAccessControlLists');

const createAccessControlList = require('./mutation/createAccessControlList');
const updateAccessControlList = require('./mutation/updateAccessControlList');
const deleteAccessControlList = require('./mutation/deleteAccessControlList');
const bulkCreateAccessControlList = require('./mutation/bulkCreateAccessControlList');

const rel_access = require('./relations/access');
const accessComponent = require('./relations/accessComponent');
const users = require('./relations/users');

const resolvers = {
    Query: {
        getAccessControlList,
        getAccessControlLists,
    },
    Mutation: {
        createAccessControlList,
        updateAccessControlList,
        deleteAccessControlList,
        bulkCreateAccessControlList,
    },
    AccessControlList: {
        access: rel_access,
        accessComponent,
        users,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAccessControlList: access,
        getAccessControlLists: access,
    },
    Mutation: {
        createAccessControlList: access,
        updateAccessControlList: access,
        deleteAccessControlList: access,
        bulkCreateAccessControlList: access,
    },
    // AccessControlList: {
    //     access: access,
    //     accessComponent: access,
    //     users: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
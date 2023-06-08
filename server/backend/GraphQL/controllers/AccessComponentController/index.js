const typeDefs = require('./typeDefs.gql');

const getAccessComponent = require('./query/getAccessComponent');
const getAccessComponents = require('./query/getAccessComponents');
const getAllAccessComponents = require('./query/getAllAccessComponents');
const getAllAccessComponentsChildren = require('./query/getAllAccessComponentsChildren');

const createAccessComponent = require('./mutation/createAccessComponent');
const updateAccessComponent = require('./mutation/updateAccessComponent');
const deleteAccessComponent = require('./mutation/deleteAccessComponent');
const sortAccessComponents = require('./mutation/sortAccessComponents');

const children = require('./relations/children');
const parent = require('./relations/parent');
const accessControlLists = require('./relations/accessControlLists');

const resolvers = {
    Query: {
        getAccessComponent,
        getAccessComponents,
        getAllAccessComponents,
        getAllAccessComponentsChildren,
    },
    Mutation: {
        createAccessComponent,
        updateAccessComponent,
        deleteAccessComponent,
        sortAccessComponents,
    },
    AccessComponent: {
        children,
        parent,
        accessControlLists,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAccessComponent: access,
        getAccessComponents: access,
        getAllAccessComponents: access,
        getAllAccessComponentsChildren: access,
    },
    Mutation: {
        createAccessComponent: access,
        updateAccessComponent: access,
        deleteAccessComponent: access,
    },
    // AccessComponent: {
    //     children: access,
    //     parent: access,
    //     accessControlLists: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
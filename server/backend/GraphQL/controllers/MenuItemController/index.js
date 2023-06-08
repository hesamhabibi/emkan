const typeDefs = require('./typeDefs.gql');

const getMenuItem = require('./query/getMenuItem');
const getMenuItems = require('./query/getMenuItems');
const getAllMenuItems = require('./query/getAllMenuItems');
const getMenuItemsByAccess = require('./query/getMenuItemsByAccess');

const createMenuItem = require('./mutation/createMenuItem');
const updateMenuItem = require('./mutation/updateMenuItem');
const deleteMenuItem = require('./mutation/deleteMenuItem');
const sortMenuItems = require('./mutation/sortMenuItems');

const rel_access = require('./relations/access');
const access_component = require('./relations/access_component');
const parent = require('./relations/parent');
const children = require('./relations/children');

const resolvers = {
    Query: {
        getMenuItem,
        getMenuItems,
        getAllMenuItems,
        getMenuItemsByAccess,
    },
    Mutation: {
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
        sortMenuItems,
    },
    MenuItem: {
        access: rel_access,
        access_component,
        parent,
        children,
    },
};

const { rules: { access, auth } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getMenuItem: access,
        getMenuItems: access,
        getAllMenuItems: access,
        getMenuItemsByAccess: auth,
    },
    Mutation: {
        createMenuItem: access,
        updateMenuItem: access,
        deleteMenuItem: access,
        sortMenuItems: access,
    },
    // MenuItem: {
    //     access: access,
    //     access_component: access,
    //     parent: access,
    //     children: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
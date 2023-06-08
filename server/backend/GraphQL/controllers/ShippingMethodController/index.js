const typeDefs = require('./typeDefs.gql');

const getShippingMethod = require('./query/getShippingMethod');
const getShippingMethods = require('./query/getShippingMethods');
const getAllShippingMethods = require('./query/getAllShippingMethods');

const createShippingMethod = require('./mutation/createShippingMethod');
const updateShippingMethod = require('./mutation/updateShippingMethod');
const deleteShippingMethod = require('./mutation/deleteShippingMethod');

const user = require('./relations/user');

const resolvers = {
    Query: {
        getShippingMethod,
        getShippingMethods,
        getAllShippingMethods,
    },
    Mutation: {
        createShippingMethod,
        updateShippingMethod,
        deleteShippingMethod,
    },
    ShippingMethod: {
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getShippingMethod: access,
        getShippingMethods: access,
        getAllShippingMethods: access,
    },
    Mutation: {
        createShippingMethod: access,
        updateShippingMethod: access,
        deleteShippingMethod: access,
    },
    // ShippingMethod: {
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
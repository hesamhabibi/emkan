const typeDefs = require('./typeDefs.gql');

const getAddress = require('./query/getAddress');
const getAddresses = require('./query/getAddresses');
const getAllAddresses = require('./query/getAllAddresses');

const createUserAddress = require('./mutation/createUserAddress');
const updateAddress = require('./mutation/updateAddress');
const deleteAddress = require('./mutation/deleteAddress');

const city = require('./relations/city');
const state = require('./relations/state');
const City_state = require('./relations/City/state');

const resolvers = {
    Query: {
        getAddress,
        getAddresses,
        getAllAddresses,
    },
    Mutation: {
        createUserAddress,
        updateAddress,
        deleteAddress,
    },
    Address: {
        city,
        state,
    },
    City: {
        state: City_state
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAddress: access,
        getAddresses: access,
        getAllAddresses: access,
    },
    Mutation: {
        createUserAddress: access,
        updateAddress: access,
        deleteAddress: access,
    },
    // Address: {
    //     city:access,
    //     state:access,
    // }
    // City: {
    //     state: access
    // }
};

module.exports = { typeDefs, resolvers, permissions };
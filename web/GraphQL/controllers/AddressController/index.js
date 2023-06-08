const schema = require('./schema/index.gql');

const getAllUserAddresses = require('./resolvers/query/getAllUserAddresses');
const getUserDefaultAddress = require('./resolvers/query/getUserDefaultAddress');

const createUserAddress = require('./resolvers/mutation/createUserAddress');
const setUserDefaultAddress = require('./resolvers/mutation/setUserDefaultAddress');

const city = require('./relations/city');
const state = require('./relations/state');
const City_state = require('./relations/City/state');

const resolvers = {
    Query: {
        getAllUserAddresses,
        getUserDefaultAddress,
    },
    Mutation: {
        createUserAddress,
        setUserDefaultAddress,
    },

    Address: {
        city,
        state
    },
    City: {
        state: City_state
    }


};

const { rules: { /* access, */ auth } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAllUserAddresses: auth,
        getUserDefaultAddress: auth,
    },
    Mutation: {
        createUserAddress: auth,
        setUserDefaultAddress: auth,
    },
    // Address: {
    //     city:access,
    //     state:access,
    // }
    // City: {
    //     state: access
    // }
};

module.exports = { schema, resolvers, permissions };
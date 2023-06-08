const schema = require('./schema/index.gql');

const getAllDeputations = require('./resolvers/query/getAllDeputations');

const city = require('./relations/city');
const state = require('./relations/state');

const resolvers = {
    Query: {
        getAllDeputations,
    },
    Deputation: {
        city,
        state,
    },
};

const { rules: { allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAllDeputations: allow,
    },
    // Deputation: {
    //     city: allow,
    //     state: allow,
    // }
};

module.exports = { schema, resolvers, permissions };
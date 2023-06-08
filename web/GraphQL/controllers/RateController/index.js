//schema
const schema = require('./schema/index.gql');

//resolvers
const addRate = require('./resolvers/mutation/addRate');


const resolvers = {
    Mutation: {
        addRate,
    },
};

const { rules: { /* access, */ auth } } = require('../../middleware/ShieldPermission');

const permissions = {
    Mutation: {
        addRate: auth,
    },
};

module.exports = { schema, resolvers, permissions };
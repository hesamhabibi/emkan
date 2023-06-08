const typeDefs = require('./typeDefs.gql');

const getTransaction = require('./query/getTransaction');
const getTransactions = require('./query/getTransactions');
const getAllTransactions = require('./query/getAllTransactions');

const setStatusTransaction = require('./mutation/setStatusTransaction');

const order = require('./relations/order');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getTransaction,
        getTransactions,
        getAllTransactions,
    },
    Mutation: {
        setStatusTransaction,
    },
    Transaction: {
        order,
        user,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getTransaction: access,
        getTransactions: access,
        getAllTransactions: access,
    },
    Mutation: {
        setStatusTransaction: access,
    },
    // Transaction: {
    //     order: access,
    //     user: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
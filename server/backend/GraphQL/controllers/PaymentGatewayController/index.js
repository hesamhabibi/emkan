const typeDefs = require('./typeDefs.gql');

const getPaymentGateway = require('./query/getPaymentGateway');
const getAllPaymentGateways = require('./query/getAllPaymentGateways');

const createPaymentGateway = require('./mutation/createPaymentGateway');
const updatePaymentGateway = require('./mutation/updatePaymentGateway');
const deletePaymentGateway = require('./mutation/deletePaymentGateway');
const sortPaymentGateways = require('./mutation/sortPaymentGateways');

const resolvers = {
    Query: {
        getPaymentGateway,
        getAllPaymentGateways,
    },
    Mutation: {
        createPaymentGateway,
        updatePaymentGateway,
        deletePaymentGateway,
        sortPaymentGateways,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getPaymentGateway: access,
        getAllPaymentGateways: access,
    },
    Mutation: {
        createPaymentGateway: access,
        updatePaymentGateway: access,
        deletePaymentGateway: access,
        sortPaymentGateways: access,
    },
};

module.exports = { typeDefs, resolvers, permissions };
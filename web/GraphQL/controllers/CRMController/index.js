const schema = require('./schema/index.gql');

const getUserPopups = require('./resolvers/query/getUserPopups');
const getUserInternalMessages = require('./resolvers/query/getUserInternalMessages');

const seenPopup = require('./resolvers/mutation/seenPopup');
const seenInternalMessage = require('./resolvers/mutation/seenInternalMessage');

const seen = require('./relations/seen');

const resolvers = {
    Query: {
        getUserPopups,
        getUserInternalMessages,
    },
    Mutation: {
        seenPopup,
        seenInternalMessage,
    },
    CRM: {
        seen,
    }
};

const { rules: { auth } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getUserPopups: auth,
        getUserInternalMessages: auth,
    },
    Mutation: {
        seenPopup: auth,
        seenInternalMessage: auth,
    },
};

module.exports = { schema, resolvers, permissions };
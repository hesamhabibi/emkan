const typeDefs = require('./typeDefs.gql');

const getBadges = require('./query/getBadges');

const resolvers = {
    Query: {
        getBadges,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getBadges: access,
    },
};

module.exports = { typeDefs, resolvers, permissions };
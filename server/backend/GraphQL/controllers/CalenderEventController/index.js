const typeDefs = require('./typeDefs.gql');

const getRangeCalenderEvents = require('./query/getRangeCalenderEvents');

const resolvers = {
    Query: {
        getRangeCalenderEvents,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getRangeCalenderEvents: access,
    },
};

module.exports = { typeDefs, resolvers, permissions };
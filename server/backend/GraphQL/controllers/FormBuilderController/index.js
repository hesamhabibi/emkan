const typeDefs = require('./typeDefs.gql');

const getCreateFormBuilder = require('./query/getCreateFormBuilder');
const getEditFormBuilder = require('./query/getEditFormBuilder');

const resolvers = {
    Query: {
        getCreateFormBuilder,
        getEditFormBuilder,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCreateFormBuilder: access,
        getEditFormBuilder: access,
    },
};

module.exports = { typeDefs, resolvers, permissions };
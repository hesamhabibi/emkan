//schema
const schema = require('./schema/index.gql');

//resolvers
const getUserShippingMethods = require('./resolvers/query/getUserShippingMethods');
const getUserPaymentMethods = require('./resolvers/query/getUserPaymentMethods');
const getTag = require('./resolvers/query/getTag');

const resolvers = {
    Query: {
        getUserShippingMethods,
        getUserPaymentMethods,
        getTag,
    },
};

const { rules: { /* auth, */ allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getUserShippingMethods: allow,
        getUserPaymentMethods: allow,
        getTag: allow,
    }
};

module.exports = { schema, resolvers, permissions };
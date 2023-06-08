const typeDefs = require('./typeDefs.gql');

const getAttributeValue = require('./query/getAttributeValue');
const getAllAttributeValues = require('./query/getAllAttributeValues');

const product = require('./relations/product');
const attribute = require('./relations/attribute');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getAttributeValue,
        getAllAttributeValues,
    },
    AttributeValue: {
        product,
        attribute,
        user,
    },
};

// const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    // Query: {
    //     getAttributeValue: access,
    //     getAllAttributeValues: access,
    // },
    // AttributeValue: {
    //     product: access,
    //     attribute: access,
    //     user: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
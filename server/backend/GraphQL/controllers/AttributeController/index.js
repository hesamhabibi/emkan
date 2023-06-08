const typeDefs = require('./typeDefs.gql');

const getAttribute = require('./query/getAttribute');
const getAttributes = require('./query/getAttributes');
const getAllAttributes = require('./query/getAllAttributes');

const createAttribute = require('./mutation/createAttribute');
const updateAttribute = require('./mutation/updateAttribute');
const deleteAttribute = require('./mutation/deleteAttribute');
const sortAttributes = require('./mutation/sortAttributes');
const updateAttributeDefaultValue = require('./mutation/updateAttributeDefaultValue');

const attribute_groups = require('./relations/attribute_groups');
const attributes = require('./relations/attributes');
const attribute_values = require('./relations/attribute_values');
const default_attribute_value = require('./relations/default_attribute_value');
const default_value = require('./relations/default_value');
const products = require('./relations/products');
const parent = require('./relations/parent');
const children = require('./relations/children');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getAttribute,
        getAttributes,
        getAllAttributes,
    },
    Mutation: {
        createAttribute,
        updateAttribute,
        deleteAttribute,
        sortAttributes,
        updateAttributeDefaultValue,
    },
    Attribute: {
        attribute_groups,
        attributes,
        attribute_values,
        default_attribute_value,
        default_value,
        products,
        parent,
        children,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getAttribute: access,
        getAttributes: access,
        getAllAttributes: access,
    },
    Mutation: {
        createAttribute: access,
        updateAttribute: access,
        deleteAttribute: access,
        sortAttributes: access,
        updateAttributeDefaultValue: access,
    },
    // Attribute: {
    // attribute_groups: access,
    // attributes: access,
    // default_attribute_value: access,
    // default_value: access,
    // products: access,
    // parent: access,
    // children: access,
    // user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
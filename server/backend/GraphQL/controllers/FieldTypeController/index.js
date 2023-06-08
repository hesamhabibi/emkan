const typeDefs = require('./typeDefs.gql');

const getFieldType = require('./query/getFieldType');
const getFieldTypes = require('./query/getFieldTypes');
const getAllFieldTypes = require('./query/getAllFieldTypes');

const createFieldType = require('./mutation/createFieldType');
const updateFieldType = require('./mutation/updateFieldType');
const deleteFieldType = require('./mutation/deleteFieldType');

const field_validations = require('./relations/field_validations');

const resolvers = {
    Query: {
        getFieldType,
        getFieldTypes,
        getAllFieldTypes,
    },
    Mutation: {
        createFieldType,
        updateFieldType,
        deleteFieldType,
    },
    FieldType: {
        field_validations,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getFieldType: access,
        getFieldTypes: access,
        getAllFieldTypes: access,
    },
    Mutation: {
        createFieldType: access,
        updateFieldType: access,
        deleteFieldType: access,
    },
    // FieldType: {
    //     field_validations: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
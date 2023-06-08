const typeDefs = require('./typeDefs.gql');

const getFieldValidation = require('./query/getFieldValidation');
const getFieldValidations = require('./query/getFieldValidations');
const getAllFieldValidations = require('./query/getAllFieldValidations');

const createFieldValidation = require('./mutation/createFieldValidation');
const updateFieldValidation = require('./mutation/updateFieldValidation');
const deleteFieldValidation = require('./mutation/deleteFieldValidation');

const resolvers = {
    Query: {
        getFieldValidation,
        getFieldValidations,
        getAllFieldValidations,
    },
    Mutation: {
        createFieldValidation,
        updateFieldValidation,
        deleteFieldValidation,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getFieldValidation: access,
        getFieldValidations: access,
        getAllFieldValidations: access,
    },
    Mutation: {
        createFieldValidation: access,
        updateFieldValidation: access,
        deleteFieldValidation: access,
    },
};

module.exports = { typeDefs, resolvers, permissions };
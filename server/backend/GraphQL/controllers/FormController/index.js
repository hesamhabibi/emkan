const typeDefs = require('./typeDefs.gql');

const getForm = require('./query/getForm');
const getForms = require('./query/getForms');
const getAllForms = require('./query/getAllForms');

const createForm = require('./mutation/createForm');
const updateForm = require('./mutation/updateForm');
const deleteForm = require('./mutation/deleteForm');

const user = require('./relations/user');
const Field_field_type = require('./relations/Field/field_type');
const Field_field_validations = require('./relations/Field/field_validations');

const resolvers = {
    Query: {
        getForm,
        getForms,
        getAllForms,
    },
    Mutation: {
        createForm,
        updateForm,
        deleteForm,
    },
    Form: {
        user,
    },
    Field: {
        field_type: Field_field_type,
        field_validations: Field_field_validations,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getForm: access,
        getForms: access,
        getAllForms: access,
    },
    Mutation: {
        createForm: access,
        updateForm: access,
        deleteForm: access,
    },
    // Form: {
    //     user: access,
    // },
    // Field: {
    //     field_type: access,
    //     field_validations: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
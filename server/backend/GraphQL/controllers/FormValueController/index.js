const typeDefs = require('./typeDefs.gql');

const getFormValue = require('./query/getFormValue');
const getFormValues = require('./query/getFormValues');
const getSelfFormValues = require('./query/getSelfFormValues');
const getAllFormValues = require('./query/getAllFormValues');

const createFormValue = require('./mutation/createFormValue');
const updateFormValue = require('./mutation/updateFormValue');
const deleteFormValue = require('./mutation/deleteFormValue');

const fields = require('./relations/fields');
const form = require('./relations/form');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getFormValue,
        getFormValues,
        getSelfFormValues,
        getAllFormValues,
    },
    Mutation: {
        createFormValue,
        updateFormValue,
        deleteFormValue,
    },
    FormValue: {
        fields,
        form,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getFormValue: access,
        getFormValues: access,
        getSelfFormValues: access,
        getAllFormValues: access,
    },
    Mutation: {
        createFormValue: access,
        updateFormValue: access,
        deleteFormValue: access,
    },
    // FormValue: {
    //     fields: access,
    //     form: access,
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
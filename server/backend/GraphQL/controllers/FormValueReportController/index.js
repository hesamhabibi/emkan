const typeDefs = require('./typeDefs.gql');

const getFormValueReport = require('./query/getFormValueReport');
const getFormValueReportFields = require('./query/getFormValueReportFields');

const resolvers = {
    Query: {
        getFormValueReport,
        getFormValueReportFields,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getFormValueReport: access,
        getFormValueReportFields: access,
    },
};

module.exports = { typeDefs, resolvers, permissions };
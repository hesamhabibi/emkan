const typeDefs = require('./typeDefs.gql');

const getReport = require('./query/getReport');
const getReports = require('./query/getReports');

const createReport = require('./mutation/createReport');
const setStatusReport = require('./mutation/setStatusReport');
const deleteReport = require('./mutation/deleteReport');

const user = require('./relations/user');

const resolvers = {
    Query: {
        getReport,
        getReports,
    },
    Mutation: {
        createReport,
        setStatusReport,
        deleteReport,
    },
    Report: {
        user,
    }
};

const { rules: { access, allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getReport: access,
        getReports: access,
    },
    Mutation: {
        createReport: allow,
        setStatusReport: access,
        deleteReport: access,
    },
    // Report: {
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
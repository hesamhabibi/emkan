const typeDefs = require('./typeDefs.gql');

const getCareerForms = require('./query/getCareerForms');

const user = require('./relations/user');

const resolvers = {
    Query: {
        getCareerForms,
    },
    CareerForm: {
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCareerForms: access,
    },
    // CareerForm: {
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
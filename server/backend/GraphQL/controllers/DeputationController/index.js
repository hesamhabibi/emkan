const typeDefs = require('./typeDefs.gql');

const getDeputation = require('./query/getDeputation');
const getDeputations = require('./query/getDeputations');
const getAllDeputations = require('./query/getAllDeputations');

const createDeputation = require('./mutation/createDeputation');
const updateDeputation = require('./mutation/updateDeputation');
const deleteDeputation = require('./mutation/deleteDeputation');

const media_gallery = require('./relations/media_gallery');
const state = require('./relations/state');
const city = require('./relations/city');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getDeputation,
        getDeputations,
        getAllDeputations,
    },
    Mutation: {
        createDeputation,
        updateDeputation,
        deleteDeputation,
    },
    Deputation: {
        media_gallery,
        state,
        city,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getDeputation: access,
        getDeputations: access,
        getAllDeputations: access,
    },
    Mutation: {
        createDeputation: access,
        updateDeputation: access,
        deleteDeputation: access,
    },
    Deputation: {
        media_gallery: access,
        state: access,
        city: access,
        user: access,
    }
};

module.exports = { typeDefs, resolvers, permissions };
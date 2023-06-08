const typeDefs = require('./typeDefs.gql');

const getDiscount = require('./query/getDiscount');
const getDiscounts = require('./query/getDiscounts');
const getAllDiscounts = require('./query/getAllDiscounts');

const createDiscount = require('./mutation/createDiscount');
const updateDiscount = require('./mutation/updateDiscount');
const deleteDiscount = require('./mutation/deleteDiscount');
const setStatusDiscount = require('./mutation/setStatusDiscount');

const user = require('./relations/user');

const resolvers = {
    Query: {
        getDiscount,
        getDiscounts,
        getAllDiscounts,
    },
    Mutation: {
        createDiscount,
        updateDiscount,
        deleteDiscount,
        setStatusDiscount,
    },
    Discount: {
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getDiscount: access,
        getDiscounts: access,
        getAllDiscounts: access,
    },
    Mutation: {
        createDiscount: access,
        updateDiscount: access,
        deleteDiscount: access,
        setStatusDiscount: access,
    },
    // Discount: {
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
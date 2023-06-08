const typeDefs = require('./typeDefs.gql');

const getBrand = require('./query/getBrand');
const getBrands = require('./query/getBrands');
const getAllBrands = require('./query/getAllBrands');

const createBrand = require('./mutation/createBrand');
const updateBrand = require('./mutation/updateBrand');
const deleteBrand = require('./mutation/deleteBrand');

const products = require('./relations/products');
const seo = require('./relations/seo');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getBrand,
        getBrands,
        getAllBrands,
    },
    Mutation: {
        createBrand,
        updateBrand,
        deleteBrand,
    },
    Brand: {
        products,
        seo,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getBrand: access,
        getBrands: access,
        getAllBrands: access,
    },
    Mutation: {
        createBrand: access,
        updateBrand: access,
        deleteBrand: access,
    },
    // Brand: {
    //     products: access,
    //     seo: access,
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
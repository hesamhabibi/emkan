const typeDefs = require('./typeDefs.gql');

const getCategory = require('./query/getCategory');
const getCategories = require('./query/getCategories');
const getAllCategories = require('./query/getAllCategories');

const createCategory = require('./mutation/createCategory');
const updateCategory = require('./mutation/updateCategory');
const deleteCategory = require('./mutation/deleteCategory');
const duplicateCategory = require('./mutation/duplicateCategory');
const sortCategories = require('./mutation/sortCategories');

const parent = require('./relations/parent');
const children = require('./relations/children');
const seo = require('./relations/seo');
const blogs = require('./relations/blogs');
const products = require('./relations/products');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getCategory,
        getCategories,
        getAllCategories,
    },
    Mutation: {
        createCategory,
        updateCategory,
        deleteCategory,
        duplicateCategory,
        sortCategories,
    },
    Category: {
        parent,
        children,
        seo,
        blogs,
        products,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCategory: access,
        getCategories: access,
        getAllCategories: access,
    },
    Mutation: {
        createCategory: access,
        updateCategory: access,
        deleteCategory: access,
        duplicateCategory: access,
        sortCategories: access,
    },
    // Category: {
    //     parent: access,
    //     children: access,
    //     seo: access,
    //     blogs: access,
    //     products: access,
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
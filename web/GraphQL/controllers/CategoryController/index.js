//schema
const schema = require('./schema/index.gql');

//resolvers
const getCategories = require('./resolvers/query/getCategories');
const getAllCategories = require('./resolvers/query/getAllCategories');
const getCategory = require('./resolvers/query/getCategory');
const getCategoryBySlug = require('./resolvers/query/getCategoryBySlug');

//relations
const parent = require('./relations/parent');
const children = require('./relations/children');
const seo = require('./relations/seo');
const blogs = require('./relations/blogs');
const products = require('./relations/products');

const resolvers = {
    Query: {
        getCategories,
        getAllCategories,
        getCategory,
        getCategoryBySlug,
    },
    Category: {
        parent,
        children,
        seo,
        blogs,
        products,
    }

};

const { rules: { /* access, */ allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCategories: allow,
        getAllCategories: allow,
        getCategory: allow,
        getCategoryBySlug: allow,
    },
    // Category: {
    //     parent: allow,
    //     children: allow,
    //     seo: allow,
    //     blogs: allow,
    //     products: allow,
    // }
};

module.exports = { schema, resolvers, permissions };
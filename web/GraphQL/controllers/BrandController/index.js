const schema = require('./schema/index.gql');

const getBrands = require('./resolvers/query/getBrands');
const getBrandBySlug = require('./resolvers/query/getBrandBySlug');

const products = require('./relations/products');
const seo = require('./relations/seo');

const resolvers = {
    Query: {
        getBrands,
        getBrandBySlug,
    },
    Brand: {
        products,
        seo,
    }
};

const { rules: { /* access, */ allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getBrands: allow
    },
    // Brand: {
    //     products: access,
    //     seo: access,
    // }
};

module.exports = { schema, resolvers, permissions };
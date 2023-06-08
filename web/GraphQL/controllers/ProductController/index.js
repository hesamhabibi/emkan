//schema
const schema = require('./schema/index.gql');

//resolvers
const getProducts = require('./resolvers/query/getProducts');
const getUserTutorials = require('./resolvers/query/getUserTutorials');
const getProductBySlug = require('./resolvers/query/getProductBySlug');

//relations
const category = require('./relations/category');
const brand = require('./relations/brand');
const seo = require('./relations/seo');
const tags = require('./relations/tags');
const tag_group = require('./relations/tag_group');
const comments = require('./relations/comments');
const average_rate = require('./relations/average_rate');
const user_rate = require('./relations/user_rate');
const view_count = require('./relations/view_count');
const media_gallery = require('./relations/media_gallery');
const price = require('./relations/price');
const details = require('./relations/details');
const mix_variant = require('./relations/mix_variant');
const access_tutorials = require('./relations/access_tutorials');
const MixVariantValue_price = require('./relations/MixVariantValue/price');

const ProductAttribute_attribute = require('./relations/ProductAttribute/attribute');
const ProductAttribute_attribute_value = require('./relations/ProductAttribute/attribute_value');
const ProductAttribute_value = require('./relations/ProductAttribute/value');

const tutorial_file = require('./relations/tutorial/file');
const tutorial_has_access = require('./relations/tutorial/has_access');

const related_products = require('./relations/related_products');

const ProductAttributeGroup_attribute_group = require('./relations/ProductAttributeGroup/attribute_group');

const resolvers = {
    Query: {
        getProducts,
        getUserTutorials,
        getProductBySlug,
    },
    Product: {
        tags,
        category,
        seo,
        comments,
        brand,
        average_rate,
        user_rate,
        view_count,
        media_gallery,
        price,
        details,
        tag_group,
        mix_variant,
        access_tutorials,
        related_products,
    },
    Tutorial: {
        file: tutorial_file,
        has_access: tutorial_has_access
    },
    MixVariantValue: {
        price: MixVariantValue_price,
    },
    ProductAttribute: {
        attribute: ProductAttribute_attribute,
        attribute_value: ProductAttribute_attribute_value,
        value: ProductAttribute_value,
    },
    ProductAttributeGroup: {
        attribute_group: ProductAttributeGroup_attribute_group,
    },
};

const { /* access , */ auth } = require('../../middleware/ShieldPermission').rules;

const permissions = {
    Query: {
        getUserTutorials: auth,
    }
};

module.exports = { schema, resolvers, permissions };
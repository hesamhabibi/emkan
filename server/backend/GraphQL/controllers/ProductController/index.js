const typeDefs = require('./typeDefs.gql');

const getProduct = require('./query/getProduct');
const getProducts = require('./query/getProducts');
const getAllProducts = require('./query/getAllProducts');
const getAllRelatedProductBySelection = require('./query/getAllRelatedProductBySelection');
const getAllColorLabels = require('./query/getAllColorLabels');

const createProduct = require('./mutation/createProduct');
const updateProduct = require('./mutation/updateProduct');
const deleteProduct = require('./mutation/deleteProduct');

const updateMixVariant = require('./mutation/updateMixVariant');
const updateMixVariantByCode = require('./mutation/updateMixVariantByCode');

const details = require('./relations/details');
const price = require('./relations/price');
const price_history = require('./relations/price_history');
const category = require('./relations/category');
const brand = require('./relations/brand');
const media_gallery = require('./relations/media_gallery');
const variant = require('./relations/variant');
const mix_variant = require('./relations/mix_variant');
const order_mix_variant = require('./relations/order_mix_variant');
const seo = require('./relations/seo');
const tags = require('./relations/tags');
const tag_group = require('./relations/tag_group');
const user = require('./relations/user');
const visit_count = require('./relations/visit_count');
const rate_average = require('./relations/rate_average');
const user_rate = require('./relations/user_rate');
const comments = require('./relations/comments');

const ProductAttribute_attribute = require('./relations/ProductAttribute/attribute');
const ProductAttribute_attribute_value = require('./relations/ProductAttribute/attribute_value');
const ProductAttribute_value = require('./relations/ProductAttribute/value');

const ProductAttributeGroup_attribute_group = require('./relations/ProductAttributeGroup/attribute_group');

const MixVariantValue_media_gallery = require('./relations/MixVariantValue/media_gallery');
const MixVariantValue_price = require('./relations/MixVariantValue/price');
const MixVariantValue_price_history = require('./relations/MixVariantValue/price_history');

const RelatedProductCollection_collection = require('./relations/RelatedProductCollection/collection');
const RelatedProductCollection_collection_title = require('./relations/RelatedProductCollection/collection_title');
const RelatedProductCollection_collection_list = require('./relations/RelatedProductCollection/collection_list');

const Tutorial_user_accesses = require('./relations/Tutorial/user_accesses');

const resolvers = {
    Query: {
        getProduct,
        getProducts,
        getAllProducts,
        getAllRelatedProductBySelection,
        getAllColorLabels,
    },
    Mutation: {
        createProduct,
        updateProduct,
        deleteProduct,
        updateMixVariant,
        updateMixVariantByCode,
    },
    Product: {
        details,
        price,
        price_history,
        category,
        brand,
        media_gallery,
        variant,
        mix_variant,
        order_mix_variant,
        seo,
        tags,
        tag_group,
        user,
        visit_count,
        rate_average,
        user_rate,
        comments,
    },
    ProductAttribute: {
        attribute: ProductAttribute_attribute,
        attribute_value: ProductAttribute_attribute_value,
        value: ProductAttribute_value,
    },
    ProductAttributeGroup: {
        attribute_group: ProductAttributeGroup_attribute_group,
    },
    MixVariantValue: {
        media_gallery: MixVariantValue_media_gallery,
        price: MixVariantValue_price,
        price_history: MixVariantValue_price_history,
    },
    RelatedProductCollection: {
        collection: RelatedProductCollection_collection,
        collection_title: RelatedProductCollection_collection_title,
        collection_list: RelatedProductCollection_collection_list,
    },
    Tutorial: {
        user_accesses: Tutorial_user_accesses
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getProduct: access,
        getProducts: access,
        getAllProducts: access,
        getAllColorLabels: access,
    },
    Mutation: {
        createProduct: access,
        updateProduct: access,
        deleteProduct: access,
        updateMixVariant: access,
        updateMixVariantByCode: access,
    },
    // Product: {
    //     details: access,
    //     price: access,
    //     price_history: access,
    //     category: access,
    //     brand: access,
    //     media_gallery: access,
    //     mix_variant: access,
    //     seo: access,
    //     tags: access,
    //     tag_group: access,
    //     user: access,
    //     visit_count: access,
    //     rate_average: access,
    //     user_rate: access,
    //     comments: access,
    // },
    // ProductAttribute: {
    //     attribute: access,
    //     attribute_value: access,
    //     value: access,
    // },
    // ProductAttributeGroup: {
    //     attribute_group: access,
    // },
    // MixVariantValue: {
    //     media_gallery: access,
    //     price: access,
    //     price_history: access,
    // },
    // RelatedProductCollection: {
    //     collection: access,
    //     collection_title: access,
    //     collection_list: access,
    // },
    // Tutorial: {
    //     user_accesses: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
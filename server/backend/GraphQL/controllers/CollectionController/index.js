const typeDefs = require('./typeDefs.gql');

const getCollection = require('./query/getCollection');
const getCollections = require('./query/getCollections');
const getAllCollections = require('./query/getAllCollections');

const createCollection = require('./mutation/createCollection');
const updateCollection = require('./mutation/updateCollection');
const deleteCollection = require('./mutation/deleteCollection');

// --------------------------------------------------------------------------

const getBagCollection = require('./query/getBagCollection');
const getBagCollections = require('./query/getBagCollections');
const getAllBagCollections = require('./query/getAllBagCollections');

const createBagCollection = require('./mutation/createBagCollection');
const updateBagCollection = require('./mutation/updateBagCollection');
const deleteBagCollection = require('./mutation/deleteBagCollection');

// --------------------------------------------------------------------------

const getCampaignCollection = require('./query/getCampaignCollection');
const getCampaignCollections = require('./query/getCampaignCollections');
const getAllCampaignCollections = require('./query/getAllCampaignCollections');

const createCampaignCollection = require('./mutation/createCampaignCollection');
const updateCampaignCollection = require('./mutation/updateCampaignCollection');
const deleteCampaignCollection = require('./mutation/deleteCampaignCollection');

// --------------------------------------------------------------------------

const getGiftCollection = require('./query/getGiftCollection');
const getGiftCollections = require('./query/getGiftCollections');
const getAllGiftCollections = require('./query/getAllGiftCollections');

const createGiftCollection = require('./mutation/createGiftCollection');
const updateGiftCollection = require('./mutation/updateGiftCollection');
const deleteGiftCollection = require('./mutation/deleteGiftCollection');

// --------------------------------------------------------------------------

const getRelatedProductCollection = require('./query/getRelatedProductCollection');
const getRelatedProductCollections = require('./query/getRelatedProductCollections');
const getAllRelatedProductCollections = require('./query/getAllRelatedProductCollections');

const createRelatedProductCollection = require('./mutation/createRelatedProductCollection');
const updateRelatedProductCollection = require('./mutation/updateRelatedProductCollection');
const deleteRelatedProductCollection = require('./mutation/deleteRelatedProductCollection');

const getCollectionProducts = require('./query/getCollectionProducts');
const getConditionProducts = require('./query/getConditionProducts');

const user = require('./relations/user');
const CollectionExtraFields_seo = require('./relations/CollectionExtraFields/seo');
const CollectionList_price = require('./relations/CollectionList/price');
const CollectionList_product = require('./relations/CollectionList/product');

const resolvers = {
    Query: {
        getCollection,
        getCollections,
        getAllCollections,

        getBagCollection,
        getBagCollections,
        getAllBagCollections,

        getCampaignCollection,
        getCampaignCollections,
        getAllCampaignCollections,

        getGiftCollection,
        getGiftCollections,
        getAllGiftCollections,

        getRelatedProductCollection,
        getRelatedProductCollections,
        getAllRelatedProductCollections,

        getCollectionProducts,
        getConditionProducts,
    },
    Mutation: {
        createCollection,
        updateCollection,
        deleteCollection,

        createBagCollection,
        updateBagCollection,
        deleteBagCollection,

        createCampaignCollection,
        updateCampaignCollection,
        deleteCampaignCollection,

        createGiftCollection,
        updateGiftCollection,
        deleteGiftCollection,

        createRelatedProductCollection,
        updateRelatedProductCollection,
        deleteRelatedProductCollection,
    },
    Collection: {
        user: user,
    },
    CollectionExtraFields: {
        seo: CollectionExtraFields_seo,
    },
    CollectionList: {
        price: CollectionList_price,
        product: CollectionList_product,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCollection: access,
        getCollections: access,
        getAllCollections: access,

        getBagCollection: access,
        getBagCollections: access,
        getAllBagCollections: access,

        getCampaignCollection: access,
        getCampaignCollections: access,
        getAllCampaignCollections: access,

        getGiftCollection: access,
        getGiftCollections: access,
        getAllGiftCollections: access,

        getRelatedProductCollection: access,
        getRelatedProductCollections: access,
        getAllRelatedProductCollections: access,

        getCollectionProducts: access,
        getConditionProducts: access,
    },
    Mutation: {
        createCollection: access,
        updateCollection: access,
        deleteCollection: access,

        createBagCollection: access,
        updateBagCollection: access,
        deleteBagCollection: access,


        createCampaignCollection: access,
        updateCampaignCollection: access,
        deleteCampaignCollection: access,


        createGiftCollection: access,
        updateGiftCollection: access,
        deleteGiftCollection: access,


        createRelatedProductCollection: access,
        updateRelatedProductCollection: access,
        deleteRelatedProductCollection: access,
    },
    // Collection: {
    //     user: access,
    // },
    // CollectionExtraFields: {
    //     seo: access,
    // },
    // CollectionList: {
    //     price: access,
    //     product: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
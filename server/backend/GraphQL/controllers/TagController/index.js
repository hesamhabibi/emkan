const typeDefs = require('./typeDefs.gql');

const getTag = require('./query/getTag');
const getTags = require('./query/getTags');
const getAllTags = require('./query/getAllTags');

const createTag = require('./mutation/createTag');
const updateTag = require('./mutation/updateTag');
const deleteTag = require('./mutation/deleteTag');

const blogs = require('./relations/blogs');
const products = require('./relations/products');
const tag_groups = require('./relations/tag_groups');
const tag_ids = require('./relations/tag_ids');
const tags = require('./relations/tags');

const resolvers = {
    Query: {
        getTag,
        getTags,
        getAllTags,
    },
    Mutation: {
        createTag,
        updateTag,
        deleteTag,
    },
    Tag: {
        blogs,
        products,
        tag_groups,
        tag_ids,
        tags,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getTag: access,
        getTags: access,
        getAllTags: access,
    },
    Mutation: {
        createTag: access,
        updateTag: access,
        deleteTag: access,
    },
    // Tag: {
    //     blogs: access,
    //     products: access,
    //     tag_groups: access,
    //     tag_ids: access,
    //     tags: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
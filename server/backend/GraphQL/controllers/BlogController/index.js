const typeDefs = require('./typeDefs.gql');

const getBlog = require('./query/getBlog');
const getBlogs = require('./query/getBlogs');
const getAllBlogs = require('./query/getAllBlogs');

const createBlog = require('./mutation/createBlog');
const updateBlog = require('./mutation/updateBlog');
const deleteBlog = require('./mutation/deleteBlog');

const media_gallery = require('./relations/media_gallery');
const category = require('./relations/category');
const seo = require('./relations/seo');
const tags = require('./relations/tags');
const tag_group = require('./relations/tag_group');
const user = require('./relations/user');
const visit_count = require('./relations/visit_count');
const rate_average = require('./relations/rate_average');
const user_rate = require('./relations/user_rate');
const comments = require('./relations/comments');

const resolvers = {
    Query: {
        getBlog,
        getBlogs,
        getAllBlogs,
    },
    Mutation: {
        createBlog,
        updateBlog,
        deleteBlog,
    },
    Blog: {
        media_gallery,
        category,
        seo,
        tags,
        tag_group,
        user,
        visit_count,
        rate_average,
        user_rate,
        comments,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getBlog: access,
        getBlogs: access,
        getAllBlogs: access,
    },
    Mutation: {
        createBlog: access,
        updateBlog: access,
        deleteBlog: access,
    },
    // Blog: {
    //     media_gallery: access,
    //     category: access,
    //     seo: access,
    //     tags: access,
    //     tag_group: access,
    //     user: access,
    //     visit_count: access,
    //     rate_average: access,
    //     user_rate: access,
    //     comments: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
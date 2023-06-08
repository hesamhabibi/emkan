//schema
const schema = require('./schema/index.gql');

//resolvers
const getBlogs = require('./resolvers/query/getBlogs');
const getBlog = require('./resolvers/query/getBlog');
const getBlogBySlug = require('./resolvers/query/getBlogBySlug');

//relations
const category = require('./relations/category');
const user = require('./relations/user');
const tags = require('./relations/tags');
const comments = require('./relations/comments');
const related_blogs = require('./relations/related_blogs');
const view_count = require('./relations/view_count');
const media_gallery = require('./relations/media_gallery');
const seo = require('./relations/seo');
const average_rate = require('./relations/average_rate');
const user_rate = require('./relations/user_rate');


const resolvers = {
    Query: {
        getBlogs,
        getBlog,
        getBlogBySlug,
    },

    Blog: {
        user,
        category,
        tags,
        user_rate,
        average_rate,
        related_blogs,
        media_gallery,
        seo,
        view_count,
        comments,
    }
};

const { allow } = require('../../middleware/ShieldPermission').rules;

const permissions = {
    Query: {
        getBlog: allow,
    }
};

module.exports = { schema, resolvers, permissions };
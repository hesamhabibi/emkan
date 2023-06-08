const schema = require('./schema/index.gql');

const getBlogComments = require('./resolvers/query/getBlogComments');
const getProductComments = require('./resolvers/query/getProductComments');
const getUserComments = require('./resolvers/query/getUserComments');

const createBlogComment = require('./resolvers/mutation/createBlogComment');
const createProductComment = require('./resolvers/mutation/createProductComment');
const replyComment = require('./resolvers/mutation/replyComment');

const reply_to = require('./relations/reply_to');
const replies = require('./relations/replies');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getProductComments,
        getBlogComments,
        getUserComments,
    },
    Mutation: {
        createBlogComment,
        createProductComment,
        replyComment,
    },
    Comment: {
        replies,
        reply_to,
        user,
    }
};

const { rules: { /* access, */ auth, allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getUserComments: auth,
    },
    Mutation: {
        createBlogComment: allow,
        createProductComment: allow,
        replyComment: allow,
    },
    Comment: {
        replies: allow,
        reply_to: allow,
        user: allow,
    }
};

module.exports = { schema, resolvers, permissions };
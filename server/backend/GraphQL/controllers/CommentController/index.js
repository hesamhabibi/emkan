const typeDefs = require('./typeDefs.gql');

const getComment = require('./query/getComment');
const getComments = require('./query/getComments');
const getAllComments = require('./query/getAllComments');

const createComment = require('./mutation/createComment');
const updateComment = require('./mutation/updateComment');
const deleteComment = require('./mutation/deleteComment');
const replyComment = require('./mutation/replyComment');
const setConfirmComment = require('./mutation/setConfirmComment');

const reply_to = require('./relations/reply_to');
const replies = require('./relations/replies');
const user = require('./relations/user');

const resolvers = {
    Query: {
        getComment,
        getComments,
        getAllComments,
    },
    Mutation: {
        createComment,
        updateComment,
        deleteComment,
        replyComment,
        setConfirmComment,
    },
    Comment: {
        replies,
        reply_to,
        user,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getComment: access,
        getComments: access,
        getAllComments: access,
    },
    Mutation: {
        createComment: access,
        updateComment: access,
        deleteComment: access,
        replyComment: access,
        setConfirmComment: access,
    },
    // Comment: {
    //     replies: access,
    //     reply_to: access,
    //     user: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
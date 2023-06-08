const typeDefs = require('./typeDefs.gql');

const getMedia = require('./query/getMedia');
const getMedias = require('./query/getMedias');
const getAllMedias = require('./query/getAllMedias');

const updateMedia = require('./mutation/updateMedia');
const deleteMedia = require('./mutation/deleteMedia');
const sortMedias = require('./mutation/sortMedias');

const user = require('./relations/user');
const MediaStructure_media = require('./relations/MediaStructure/media');
const MediaGalleryStructure_media = require('./relations/MediaGalleryStructure/media');

const resolvers = {
    Query: {
        getMedia,
        getMedias,
        getAllMedias,
    },
    Mutation: {
        updateMedia,
        deleteMedia,
        sortMedias,
    },
    Media: {
        user,
    },
    MediaStructure: {
        media: MediaStructure_media,
    },
    MediaGalleryStructure: {
        media: MediaGalleryStructure_media,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getMedia: access,
        getMedias: access,
        getAllMedias: access,
    },
    Mutation: {
        updateMedia: access,
        deleteMedia: access,
        sortMedias: access,
    },
    // Media: {
    //     user: access,
    // },
    // MediaStructure: {
    //     media: access,
    // }
    // MediaGalleryStructure: {
    //     media: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
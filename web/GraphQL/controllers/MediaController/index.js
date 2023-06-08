const schema = require('./schema/index.gql');

const MediaStructure_media = require('./relations/MediaStructure/media');
const MediaGalleryStructure_media = require('./relations/MediaGalleryStructure/media');

const resolvers = {
    MediaStructure: {
        media: MediaStructure_media,
    },
    MediaGalleryStructure: {
        media: MediaGalleryStructure_media,
    }
};

module.exports = { schema, resolvers };
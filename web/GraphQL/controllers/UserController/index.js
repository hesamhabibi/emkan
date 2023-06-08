//schema
const schema = require('./schema/index.gql');

//relations
const access_name = require('./relations/access_name');
const gender = require('./relations/gender');
const media = require('./relations/media');

const resolvers = {
    User: {
        access_name,
        gender,
        media
    },
    Author: {
        access_name,
        gender,
        media
    },
};

module.exports = { schema, resolvers };
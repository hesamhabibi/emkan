//schema
const schema = require('./schema/index.gql');

//resolvers
const getSliderByKey = require('./resolvers/query/getSliderByKey');

const resolvers = {
    Query: {
        getSliderByKey,
    },
};

module.exports = { schema, resolvers };
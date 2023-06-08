const typeDefs = require('./typeDefs.gql');

const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
};

module.exports = { resolvers, typeDefs };
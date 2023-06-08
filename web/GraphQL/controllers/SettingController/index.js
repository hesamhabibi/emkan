//schema
const schema = require('./schema/index.gql');

//resolvers
const getSettingByKey = require('./resolvers/query/getSettingByKey');
const getSettingByKeys = require('./resolvers/query/getSettingByKeys');

const resolvers = {
    Query: {
        getSettingByKey,
        getSettingByKeys,
    },
};

module.exports = { schema, resolvers };
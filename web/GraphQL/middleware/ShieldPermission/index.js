const { allow, deny } = require('graphql-shield');
const auth = require('./authRule');
const access = require('./accessRule');

const rules = {
    allow,
    deny,
    auth,
    access,
};

module.exports = {
    rules,
};
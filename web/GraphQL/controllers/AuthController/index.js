const schema = require('./schema/index.gql');

const getCurrentUser = require('./resolvers/query/getCurrentUser');

const login = require('./resolvers/mutation/login');
const register = require('./resolvers/mutation/register');

const updateUser = require('./resolvers/mutation/updateUser');
const changePassword = require('./resolvers/mutation/changePassword');
const loginSendSMS = require('./resolvers/mutation/loginSendSMS');
const registerSendSMS = require('./resolvers/mutation/registerSendSMS');
const SMSLoginVerifyToken = require('./resolvers/mutation/SMSLoginVerifyToken');
const resetPasswordSendEmail = require('./resolvers/mutation/resetPasswordSendEmail');
const resetPasswordVerify = require('./resolvers/mutation/resetPasswordVerify');

const resolvers = {
    Query: {
        getCurrentUser,
    },
    Mutation: {
        login,
        register,
        changePassword,
        updateUser,
        loginSendSMS,
        registerSendSMS,
        SMSLoginVerifyToken,
        resetPasswordSendEmail,
        resetPasswordVerify,
    },
};

const { rules: { auth, allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCurrentUser: auth,
    },
    Mutation: {
        login: allow,
        // register: allow,

        updateUser: auth,
        changePassword: auth,
        loginSendSMS: allow,
        registerSendSMS: allow,
        SMSLoginVerifyToken: allow,
        resetPasswordSendEmail: allow,
        resetPasswordVerify: allow,
    }
};

module.exports = { schema, resolvers, permissions };
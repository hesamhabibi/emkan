const typeDefs = require('./typeDefs.gql');

const getSelf = require('./query/getSelf');

const panelLogin = require('./mutation/panelLogin');
const panelLogout = require('./mutation/panelLogout');
const panelRegister = require('./mutation/panelRegister');

const resetPassword = require('./mutation/resetPassword');
const resetPasswordEmail = require('./mutation/resetPasswordEmail');

const SMSLoginSendToken = require('./mutation/SMSLoginSendToken');
const SMSLoginVerifyToken = require('./mutation/SMSLoginVerifyToken');
const SMSRegisterSendToken = require('./mutation/SMSRegisterSendToken');

const resolvers = {
    Query: {
        getSelf,
    },
    Mutation: {
        panelLogin,
        panelLogout,
        panelRegister,

        SMSLoginSendToken,
        SMSLoginVerifyToken,
        SMSRegisterSendToken,

        resetPassword,
        resetPasswordEmail,
    },
};

const { rules: { auth, allow } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getSelf: auth,
    },
    Mutation: {
        panelLogin: allow,
        panelLogout: auth,
        panelRegister: allow,

        SMSLoginSendToken: allow,
        SMSLoginVerifyToken: allow,
        SMSRegisterSendToken: allow,

        resetPassword: allow,
        resetPasswordEmail: allow,
    }
};

module.exports = { typeDefs, resolvers, permissions };
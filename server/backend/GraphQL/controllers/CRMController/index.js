const typeDefs = require('./typeDefs.gql');

const getCRM = require('./query/getCRM');
const getCRMs = require('./query/getCRMs');
const getAllCRMs = require('./query/getAllCRMs');

const sendSMS = require('./mutation/sendSMS');
const sendEmail = require('./mutation/sendEmail');
const sendPushNotification = require('./mutation/sendPushNotification');
const sendPopup = require('./mutation/sendPopup');
const sendInternalMessage = require('./mutation/sendInternalMessage');
const sendExternalMessage = require('./mutation/sendExternalMessage');
const deleteCRM = require('./mutation/deleteCRM');

const user = require('./relations/user');
const CRMSendTo_receiver_user = require('./relations/CRMSendTo/receiver_user');

const resolvers = {
    Query: {
        getCRM,
        getCRMs,
        getAllCRMs,
    },
    Mutation: {
        sendSMS,
        sendEmail,
        sendPushNotification,
        sendPopup,
        sendInternalMessage,
        sendExternalMessage,
        deleteCRM,
    },
    CRM: {
        user,
    },
    CRMSendTo: {
        receiver_user: CRMSendTo_receiver_user,
    },
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getCRM: access,
        getCRMs: access,
        getAllCRMs: access,
    },
    Mutation: {
        sendSMS: access,
        sendEmail: access,
        sendPushNotification: access,
        sendPopup: access,
        sendInternalMessage: access,
        sendExternalMessage: access,
        deleteCRM: access,
    },
    // CRM: {
    //     user: access,
    // },
    // CRMSendTo: {
    //     receiver_user: access,
    // },
};

module.exports = { typeDefs, resolvers, permissions };
const schema = require('./schema/index.gql');

const getUserTicket = require('./resolvers/query/getUserTicket');
const getUserTickets = require('./resolvers/query/getUserTickets');
const getAllUserTickets = require('./resolvers/query/getAllUserTickets');
const getTicketDepartments = require('./resolvers/query/getTicketDepartments');

// const replyTicket = require('./resolvers/mutation/replyTicket');
// const setStatusTicket = require('./resolvers/mutation/setStatusTicket');

const user = require('./relations/user');
const replies = require('./relations/replies');
const reply_to = require('./relations/reply_to');
const TicketDepartment_tickets = require('./relations/TicketDepartment/tickets');

const resolvers = {
    Query: {
        getUserTicket,
        getUserTickets,
        getAllUserTickets,
        getTicketDepartments,
    },
    // Mutation: {
    //     replyTicket,
    //     setStatusTicket,
    // },
    Ticket: {
        user,
        replies,
        reply_to,
    },
    TicketDepartment: {
        tickets: TicketDepartment_tickets,
    }
};

const { rules: { auth } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getUserTicket: auth,
        getUserTickets: auth,
        getAllUserTickets: auth,
        getTicketDepartments: auth,
    },
    // Mutation: {
    //     replyTicket: auth,
    //     setStatusTicket: auth,
    // },
    // Ticket: {
    //     user: auth,
    //     replies: auth,
    //     reply_to: auth,
    // },
    // TicketDepartment: {
    //     tickets: auth,
    // }
};

module.exports = { schema, resolvers, permissions };
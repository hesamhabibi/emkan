const typeDefs = require('./typeDefs.gql');

const getTicket = require('./query/getTicket');
const getTickets = require('./query/getTickets');
const getAllTickets = require('./query/getAllTickets');
const getTicketDepartments = require('./query/getTicketDepartments');

const replyTicket = require('./mutation/replyTicket');
const setStatusTicket = require('./mutation/setStatusTicket');

const user = require('./relations/user');
const replies = require('./relations/replies');
const reply_to = require('./relations/reply_to');
const TicketDepartment_tickets = require('./relations/TicketDepartment/tickets');

const resolvers = {
    Query: {
        getTicket,
        getTickets,
        getAllTickets,
        getTicketDepartments,
    },
    Mutation: {
        replyTicket,
        setStatusTicket,
    },
    Ticket: {
        user,
        replies,
        reply_to,
    },
    TicketDepartment: {
        tickets: TicketDepartment_tickets,
    }
};

const { rules: { access } } = require('../../middleware/ShieldPermission');

const permissions = {
    Query: {
        getTicket: access,
        getTickets: access,
        getAllTickets: access,
        getTicketDepartments: access,
    },
    Mutation: {
        replyTicket: access,
        setStatusTicket: access,
    },
    // Ticket: {
    //     user: access,
    //     replies: access,
    //     reply_to: access,
    // },
    // TicketDepartment: {
    //     tickets: access,
    // }
};

module.exports = { typeDefs, resolvers, permissions };
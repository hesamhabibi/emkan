const CareerFormRoutes = require('./CareerFormRoutes');
const TicketRoutes = require('./TicketRoutes');
const ProfileRoutes = require('./ProfileRoutes');

const ttRoutes = require('./ttRoutes');

module.exports = [
    ['/career-forms', CareerFormRoutes],
    ['/tickets', TicketRoutes],
    ['/profile', ProfileRoutes],

    ttRoutes,
];
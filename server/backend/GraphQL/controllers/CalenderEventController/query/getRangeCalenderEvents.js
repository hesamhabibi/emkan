const { get_events } = require('@helpers/CalenderEventsHelper');

module.exports = async (parent, args) => {
    return get_events(args.date_start, args.date_end, args.types);
};
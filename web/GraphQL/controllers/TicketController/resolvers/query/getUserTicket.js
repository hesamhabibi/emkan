module.exports = async (parent, args, { models: { TicketModel }, error_res, trans }) => {
    // find ticket
    let ticket;
    try {
        ticket = await TicketModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        ticket = null;
    }
    // check ticket exists
    if (!ticket)
        error_res(trans('not_found', { attr: "ticket" }));
    return ticket;
};
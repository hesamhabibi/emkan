const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { TicketModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find ticket
    let ticket;
    try {
        ticket = await TicketModel.findById(args.id);
    } catch (e) {
        ticket = null;
    }
    // check ticket exists
    if (!ticket)
        error_res(trans('not_found', { attr: "ticket" }));

    // get input
    const input = collect(args.input).only(['status']).all();

    // validate input :
    const rules = {
        status: ['required', 'integer'],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update ticket
    await ticket.set(input).save();

    return ticket;
};
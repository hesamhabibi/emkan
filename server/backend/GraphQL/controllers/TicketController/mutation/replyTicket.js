const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { TicketModel }, helpers: { ValidationHelper, MediaHelper: { attachMedia } }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['title', 'text', 'media', 'send_with']).all();
    input.user_id = AuthUser.id;
    input.reply_to_id = args.id;

    // validate input :
    const rules = {
        title: ['required', 'string'],
        text: ['required', 'string'],
        media: {
            media_id: ['exists:MediaModel,_id'],
            alt: ['string'],
            url: 'string',
        },
        reply_to_id: ['exists:TicketModel,_id'],
        send_with: ['integer'],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // create ticket
    const ticket = await TicketModel.create(input);
    if (input?.media?.media_id)
        await attachMedia(ticket, input.media.media_id);
    return ticket;
};
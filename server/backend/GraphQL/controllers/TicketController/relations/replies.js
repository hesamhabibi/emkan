module.exports = async (parent, args, { models: { TicketModel } }) => {
    try {
        return await TicketModel.find({ reply_to_id: parent._id });
    } catch (e) {
        return null;
    }
};
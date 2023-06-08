module.exports = async (parent, args, { models: { TicketModel } }) => {
    try {
        return await TicketModel.findOne({ _id: parent.reply_to_id });
    } catch (e) {
        return null;
    }
};
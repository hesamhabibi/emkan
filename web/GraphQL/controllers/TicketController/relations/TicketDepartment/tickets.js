module.exports = async (parent, args, { models: { TicketModel } }) => {
    try {
        return await TicketModel.find({ department: parent.number });
    } catch (e) {
        return null;
    }
};
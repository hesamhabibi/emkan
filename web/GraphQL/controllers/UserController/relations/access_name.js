module.exports = async (parent, args, { models: { AccessModel } }) => {
    try {
        return (await AccessModel.findOne({ _id: parent.access_id })).name;
    } catch {
        return null;
    }
};
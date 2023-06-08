module.exports = async (parent, args, { models: { AddressModel } }) => {
    try {
        return await AddressModel.findOne({ _id: parent.address_id });
    } catch (e) {
        return null;
    }
};
module.exports = async (parent, args, { models: { AddressModel } }) => {
    try {
        return await AddressModel.find({ _id: { "$in": parent.address_ids } });
    } catch (e) {
        return [];
    }
};
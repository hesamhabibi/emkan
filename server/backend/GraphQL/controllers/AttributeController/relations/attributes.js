module.exports = async (parent, args, { models: { AttributeModel } }) => {
    try {
        return await AttributeModel.find({ _id: { "$in": parent.attribute_ids } });
    } catch (e) {
        return [];
    }
};
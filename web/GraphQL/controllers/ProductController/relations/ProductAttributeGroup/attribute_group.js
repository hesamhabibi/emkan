module.exports = async (parent, args, { models: { AttributeModel } }) => {
    try {
        return await AttributeModel.findOne({ _id: parent.attribute_group_id });
    } catch (e) {
        return null;
    }
};
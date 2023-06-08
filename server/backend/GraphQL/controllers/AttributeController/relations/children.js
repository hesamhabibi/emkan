module.exports = async (parent, args, { models: { AttributeModel } }) => {
    try {
        return await AttributeModel.find({ parent_id: parent.id });
    } catch (e) {
        return [];
    }
};
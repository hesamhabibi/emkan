module.exports = async (parent, args, { models: { ProductModel } }) => {
    try {
        return await ProductModel.find({ "$or": [{ attribute_groups: { attribute_group_id: parent._id } }, { attribute_groups: { attributes: { attribute_id: parent._id } } }] });
    } catch (e) {
        return null;
    }
};
module.exports = async (parent, args, { models: { MenuItemModel } }) => {
    try {
        return await MenuItemModel.findOne({ _id: parent.parent_id });
    } catch (e) {
        return null;
    }
};
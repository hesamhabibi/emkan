module.exports = async (parent, args, { models: { MenuItemModel } }) => {
    try {
        return await MenuItemModel.find({ parent_id: parent.id });
    } catch (e) {
        return [];
    }
};
/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { MenuItemModel }, trans }) => {
    const menu_items = args.input;
    for (let i = 0; i < menu_items.length; i += 1) {
        try {
            if (menu_items[i].id !== menu_items[i].parent_id) {
                await MenuItemModel.findByIdAndUpdate(menu_items[i].id, {
                    sort: menu_items[i].sort,
                    parent_id: menu_items[i].parent_id,
                });
            }
        } catch (e) {
            console.log('in sort menu item: ', e);
        }
    }
    return {
        success: true,
        message: trans('done'),
    };
};
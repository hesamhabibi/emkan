module.exports = async (parent, args, { models: { MenuItemModel }, error_res, trans }) => {
    // find menu_item
    let menu_item;
    try {
        menu_item = await MenuItemModel.findById(args.id);
    } catch (e) {
        menu_item = null;
    }
    // check menu_item exists
    if (!menu_item)
        error_res(trans('not_found', { attr: "menu_item" }));
    // delete menu_item
    await menu_item.delete();
    return { success: true, message: trans('done') };
};
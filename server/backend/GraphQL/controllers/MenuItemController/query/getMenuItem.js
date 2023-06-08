module.exports = async (parent, args, { models: { MenuItemModel }, error_res, trans }) => {
    // find menu item
    let menu_item;
    try {
        menu_item = await MenuItemModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        menu_item = null;
    }

    // check menu item exists
    if (!menu_item)
        error_res(trans('not_found', { attr: "menu_item" }));

    return menu_item;
};
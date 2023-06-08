const { collect } = require('collect.js');
const { AccessComponentModel, AccessControlListModel, MenuItemModel } = require('../models');
const { get_children_flat } = require('./ArrayHelper');
const DeveloperHelper = require('./DeveloperHelper');

const getMenuItemsByAccess = async (AuthUser) => {

    const is_developer = DeveloperHelper.is_developer(AuthUser.access_id);

    if (!AuthUser)
        return [];
    const { access_id } = AuthUser;

    const all_access_lists = await AccessControlListModel.find({ 'access_id': access_id });
    for (let i = 0; i < all_access_lists.length; i += 1) {
        all_access_lists[i] = String(all_access_lists[i].access_component_id);
    }

    // filter menu_item by access
    const all_menu_items = await MenuItemModel.find({ access_id, show_in_menu: true }).sort({ sort: 1 });
    const menu_items = collect(all_menu_items).
        filter((item) => { return (!item.access_component_id || all_access_lists.includes(String(item.access_component_id))); }).all();

    // filter access_components by access
    const all_access_components = await AccessComponentModel.find({}).sort({ sort: 1 });
    let access_components;
    if (!is_developer)
        access_components = collect(all_access_components).filter((item) => { return (all_access_lists.includes(String(item._id))); });
    else
        access_components = collect(all_access_components);

    const result = [];

    for (let i = 0; i < menu_items.length; i += 1) {
        const menu_item = menu_items[i];
        const menu_item_access_component = access_components.filter((item) => { return String(item._id) === String(menu_item.access_component_id); }).first();

        if (menu_item_access_component) {
            // a helper function to get all children in flat list
            const menu_item_all_access_components = collect(get_children_flat(menu_item_access_component, access_components.all()));

            // route
            menu_item.route = menu_item_access_component.action;

            // columns and fields
            const columns_fields = menu_item_all_access_components.
                where('type', '==', AccessComponentModel.types.column).
                filter((item) => { return (String(item.parent_id) === String(menu_item_access_component._id)); });
            menu_item.columns = columns_fields.pluck('key');
            menu_item.fields = columns_fields.pluck('field');

            // actions
            menu_item.actions = menu_item_all_access_components.
                where('type', '==', AccessComponentModel.types.action).
                filter((item) => { return (String(item.parent_id) === String(menu_item_access_component._id)); }).pluck('key'); /// actions

            // child
            menu_item.child_access_components_keys = menu_item_all_access_components.
                where('type', '!=', AccessComponentModel.types.menu_item).
                where('type', '!=', AccessComponentModel.types.column).
                where('type', '!=', AccessComponentModel.types.route).
                where('type', '!=', AccessComponentModel.types.action).
                pluck('key');
        }

        result.push(menu_item);
    }

    return result;
};

module.exports = {
    getMenuItemsByAccess,
};
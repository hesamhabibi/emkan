/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { collect } = require('collect.js');
const { AccessComponentModel, AccessControlListModel, AccessModel, MenuItemModel } = require('@models');
const accesses = require('./access_data/accesses');
const access_components = require('./access_data/access_components');
const access_control_lists = require('./access_data/access_control_lists');
const get_menu_items = require('./access_data/menu_items');

const filter_keys = [
    "$oid"
];
const convert_obj = (key, value) => {
    switch (key) {
        case "$oid": return value["$oid"];
    }
    return value;
};

const go_deeper = (obj) => {
    try {
        if (typeof obj === 'object') {
            let keys = Object.keys(obj);
            const need_convert_key = filter_keys.find(item => keys.includes(item));
            if (need_convert_key)
                obj = convert_obj(need_convert_key, obj);
            keys = Object.keys(obj);
            for (let i = 0; i < keys.length; i += 1) {
                obj[keys[i]] = go_deeper(obj[keys[i]]);
            }
            return obj;
        }
        return obj;
    } catch {
        return obj;
    }
};

module.exports = async () => {

    for (let i = 0; i < access_components.length; i += 1) {
        try {
            access_components[i] = go_deeper(access_components[i]);
            await AccessComponentModel.updateOne({ _id: access_components[i]._id }, access_components[i], { upsert: true });
        } catch (e) {
            console.log(e);
        }
    }

    for (let i = 0; i < accesses.length; i += 1) {
        try {
            await AccessModel.updateOne({ _id: accesses[i]._id }, accesses[i], { upsert: true });
        } catch (e) {
            console.log(e);
        }
    }

    const menu_items = await get_menu_items();

    for (let i = 0; i < menu_items.length; i += 1) {
        try {
            await MenuItemModel.updateOne({ access_component_id: menu_items[i].access_component_id, access_id: menu_items[i].access_id }, menu_items[i], { upsert: true });
        } catch (e) {
            console.log(e);
        }

        // add access for this menu item
        try {
            const access_component = await AccessComponentModel.findOne({ _id: menu_items[i].access_component_id });
            if (access_component) {
                await AccessControlListModel.updateOne({
                    access_component_id: menu_items[i].access_component_id, access_id: menu_items[i].access_id
                }, {
                    "access_component_action": access_component?.action,
                    "access_component_action_type": access_component?.action_type,
                    "access_component_key": access_component?.key,
                    "access_component_type": access_component?.type,
                }, {
                    upsert: true
                });
            }
        } catch (e) {
            console.log(e);
        }
    }


    for (let i = 0; i < access_control_lists.length; i += 1) {
        try {
            await AccessControlListModel.updateOne({ access_component_id: access_control_lists[i].access_component_id, access_id: access_control_lists[i].access_id }, collect(access_control_lists[i]).except(['_id', 'id']).all(), { upsert: true });
        } catch (e) {
            console.log(e);
        }
    }

};
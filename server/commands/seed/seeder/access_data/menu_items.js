const { AccessComponentModel } = require('@models');
const { isNull } = require('lodash');
const run = async () => {
    let menu_items = [
        {
            "__v": "0",
            "access_component_id": null,
            "access_id": "607df1ebaccf750cc894a5a7",
            "createdAt": "28/5/2021 08:20:24.995",
            "icon": "fas fa-address-card",
            "parent_id": null,
            "show_in_menu": "true",
            "sort": "2",
            "title": "مدیریت دسترسی",
            "updatedAt": "28/5/2021 08:20:24.995"
        },
        {
            "__v": "0",
            "access_component_id": "608822598dbfb62038e5148d",
            "access_id": "607df1ebaccf750cc894a5a7",
            "createdAt": "28/5/2021 08:20:24.995",
            "icon": "fas fa-copyright",
            "parent_id": "6191e7cbcb349f51dcffd14a",
            "show_in_menu": "true",
            "sort": "2",
            "title": "کامپوننت های دسترسی",
            "updatedAt": "28/5/2021 08:20:24.995"
        },
        {
            "__v": "0",
            "access_component_id": "608abdb2a56d7c04c01454cb",
            "access_id": "607df1ebaccf750cc894a5a7",
            "createdAt": "28/5/2021 08:20:25.029",
            "icon": "fas fa-universal-access",
            "parent_id": "6191e7cbcb349f51dcffd14a",
            "show_in_menu": "true",
            "sort": "3",
            "title": "دسترسی ها",
            "updatedAt": "28/5/2021 08:20:25.029"
        },
        {
            "__v": "0",
            "access_component_id": "608ac57e6d1162311ca6f0de",
            "access_id": "607df1ebaccf750cc894a5a7",
            "createdAt": "28/5/2021 08:20:25.066",
            "icon": "fas fa-bars",
            "parent_id": "6191e7cbcb349f51dcffd14a",
            "show_in_menu": "true",
            "sort": "4",
            "title": "مدیریت منوایتم ها",
            "updatedAt": "28/5/2021 08:20:25.066"
        },
        {
            "__v": "0",
            "access_component_id": "607df2c4accf750cc894a5a8",
            "access_id": "607df1ebaccf750cc894a5a7",
            "createdAt": "28/5/2021 08:20:24.943",
            "icon": "fas fa-users",
            "parent_id": null,
            "show_in_menu": "true",
            "sort": "5",
            "title": "کاربران",
            "updatedAt": "28/5/2021 08:20:24.943"
        },
        {
            "__v": "0",
            "access_component_id": "607df2c4accf750cc894a5a8",
            "access_id": "607df1ebaccf750cc894a5a8",
            "createdAt": "28/5/2021 08:20:25.1",
            "icon": "fas fa-users",
            "parent_id": null,
            "show_in_menu": "true",
            "sort": "1",
            "title": "مدیریت کاربران",
            "updatedAt": "28/5/2021 08:20:25.1"
        }
    ];

    menu_items.push(
        {
            "_id": "62f508a9793bb29e9271d3f0",
            "__v": "0",
            "access_component_id": "607df2c4accf750cc894a5a8",
            "access_id": "607df1ebaccf750cc894a5a7",
            "createdAt": "28/5/2021 08:20:25.1",
            "icon": "fas fa-list",
            "parent_id": null,
            "show_in_menu": "true",
            "sort": "1",
            "title": "همه منو آیتم ها",
            "updatedAt": "28/5/2021 08:20:25.1"
        });

    const menu_items_components = await AccessComponentModel.find({ type: AccessComponentModel.types['menu_item'] });
    for (let menu_items_component of menu_items_components) {
        if (menu_items.findIndex((component) => {
            return (String(component.access_component_id) == String(menu_items_component._id));
        }) < 0) {
            menu_items.push({
                "__v": "0",
                "access_component_id": String(menu_items_component._id),
                "access_id": "607df1ebaccf750cc894a5a7",
                "createdAt": "28/5/2021 08:20:25.1",
                "icon": null,
                "parent_id": "62f508a9793bb29e9271d3f0",
                "show_in_menu": "true",
                "sort": "99999",
                "title": menu_items_component.name,
                "updatedAt": "28/5/2021 08:20:25.1"
            });
        }
    }

    return menu_items;
};

module.exports = run;
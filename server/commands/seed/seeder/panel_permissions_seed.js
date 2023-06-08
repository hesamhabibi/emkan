const { AccessComponentModel } = require('@models');
const panel_permissions_columns = require('@common/constant_data/panel_permissions/columns.json');
const panel_permissions_actions = require('@common/constant_data/panel_permissions/actions.json');
const panel_permissions_others = require('@common/constant_data/panel_permissions/others.json');

module.exports = async (type = null) => {

    // columns
    const column_keys = Object.keys(panel_permissions_columns);
    for (let i = 0; i < column_keys.length; i += 1) {
        try {
            const parent = await AccessComponentModel.findOne({ action: column_keys[i], type: AccessComponentModel.types.menu_item, kind_status: AccessComponentModel.kind_statuses.panel });
            if (parent) {
                const components = panel_permissions_columns[column_keys[i]];
                if (type == "hard" || type == "very_hard") {
                    await AccessComponentModel.deleteMany({ parent_id: parent._id, type: AccessComponentModel.types.column });
                }
                for (let j in components) {
                    if (type == "very_hard") {
                        (await AccessComponentModel.deleteMany({ key: components[j].key, type: AccessComponentModel.types.column }));
                    }
                    if (!(await AccessComponentModel.exists({ key: components[j].key, parent_id: parent._id, type: AccessComponentModel.types.column }))) {
                        await AccessComponentModel.create({
                            name: components[j].name,
                            type: AccessComponentModel.types.column,
                            key: components[j].key,
                            action: components[j].action,
                            field: components[j].field,
                            description: null,
                            sort: null,
                            parent_id: parent._id,
                            kind_status: AccessComponentModel.kind_statuses.panel,
                        });
                    }
                }
            } else {
                console.log(`Error: no menu_item found with "${column_keys[i]}" url`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // actions
    const action_keys = Object.keys(panel_permissions_actions);
    for (let i = 0; i < action_keys.length; i += 1) {
        try {
            const parent = await AccessComponentModel.findOne({ action: action_keys[i], type: AccessComponentModel.types.menu_item, kind_status: AccessComponentModel.kind_statuses.panel });
            if (parent) {
                const components = panel_permissions_actions[action_keys[i]];
                if (type == "hard" || type == "very_hard") {
                    await AccessComponentModel.deleteMany({ parent_id: parent._id, type: AccessComponentModel.types.action });
                }

                for (let j in components) {
                    if (type == "very_hard") {
                        (await AccessComponentModel.deleteMany({ key: components[j].key, type: AccessComponentModel.types.action }));
                    }
                    if (!(await AccessComponentModel.exists({ key: components[j].key, parent_id: parent._id, type: AccessComponentModel.types.action }))) {
                        await AccessComponentModel.create({
                            name: components[j].name,
                            type: AccessComponentModel.types.action,
                            key: components[j].key,
                            action: components[j].action,
                            field: components[j].field,
                            description: null,
                            sort: null,
                            parent_id: parent._id,
                            kind_status: AccessComponentModel.kind_statuses.panel,
                        });
                    }
                }
            } else {
                console.log(`Error: no menu_item found with "${action_keys[i]}" url`);
            }
        } catch (e) {
            console.log(e);
        }
    }


    // others
    const other_keys = Object.keys(panel_permissions_others);
    for (let i = 0; i < other_keys.length; i += 1) {
        try {
            const parent = await AccessComponentModel.findOne({ action: other_keys[i], type: AccessComponentModel.types.menu_item, kind_status: AccessComponentModel.kind_statuses.panel });
            if (parent) {
                const components = panel_permissions_others[other_keys[i]];
                if (type == "hard" || type == "very_hard") {
                    await AccessComponentModel.deleteMany({ parent_id: parent._id, type: AccessComponentModel.types.id });
                }
                for (let j in components) {
                    if (type == "very_hard") {
                        (await AccessComponentModel.deleteMany({ key: components[j].key }));
                    }
                    if (!(await AccessComponentModel.exists({ key: components[j].key }))) {
                        await AccessComponentModel.create({
                            name: components[j].name,
                            type: AccessComponentModel.types.id,
                            key: components[j].key,
                            action: components[j].action,
                            field: components[j].field,
                            description: null,
                            sort: null,
                            parent_id: parent._id,
                            kind_status: AccessComponentModel.kind_statuses.panel,
                        });
                    }
                }
            } else {
                console.log(`Error: no menu_item found with "${other_keys[i]}" url`);
            }
        } catch (e) {
            console.log(e);
        }
    }
};
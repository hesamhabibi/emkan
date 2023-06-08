module.exports = async (resolve, parent, args, context, info) => {
    
    // first check if field is in control list > if not check then: if relation is in component then access denied
    if (parent !== undefined && context.AuthUser && !context.is_developer) { // todo: check if this request is for field

        // relation type: "ModelName">"related ModelName"
        const { AccessComponentModel, AccessControlListModel } = context.models;

        let from_model_type;
        let current_field;
        try {
            from_model_type = info.parentType;
            current_field = info.fieldName;
        } catch {
            from_model_type = null;
            current_field = null;
        }

        let obj = info.path;
        let current_path = '';
        while (obj) {
            if (obj.fieldName)
                if (current_path)
                    current_path = `${obj.fieldName}/${current_path}`;
                else
                    current_path = `${obj.fieldName}`;
            obj = obj.prev;
        }

        // console.log(current_path);
        // console.log(info.fieldName);
        // console.log(from_model_type, '>', current_field);
        // console.log(info)
        if (from_model_type && current_field) {

            from_model_type = String(from_model_type).replace(/\[\]!/g, '');
            current_field = String(current_field).replace(/\[\]!/g, '');

            const f = current_path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape for regex
            const regex_pattern = `^${f}$|^${f}&&|&&${f}$|&&${f}&&`;
            // console.log(regex_pattern);

            let accessComponent_exists;
            try {
                // check if any accessComponent defined for this relation
                accessComponent_exists = await AccessComponentModel.exists({
                    action_type: AccessComponentModel.action_types.gql_field,
                    "$or": [
                        { action: `${from_model_type}>${current_field}` },
                        { action: { "$regex": regex_pattern } }
                    ],
                });
            } catch {
                accessComponent_exists = false;
            }

            if (accessComponent_exists) { // skip if no component found for this route

                let access_id;
                try {
                    access_id = context.AuthUser.access_id;
                } catch {
                    access_id = null;
                }

                let accessControlList_exists;
                try {

                    accessControlList_exists = await AccessControlListModel.exists({ // be careful
                        access_id,
                        access_component_action_type: AccessComponentModel.action_types.gql_field,
                        "$or": [
                            { access_component_action: `${from_model_type}>${current_field}` },
                            { access_component_action: { "$regex": regex_pattern } },
                        ]
                    });
                } catch {
                    accessControlList_exists = false;
                }

                if (!accessControlList_exists)
                    return undefined;
            }
        }
    }

    // console.log(info.fieldName)
    // console.log(info)
    // console.log('---'.repeat(10))
    // access granted
    return resolve(parent, args, context, info);
};
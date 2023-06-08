const typeDefs = `
directive @access on FIELD_DEFINITION
`;

const access = async (next, parent, args, context, info) => {
    // first check if field is in control list > if not then: check if relation is in component then access denied
    if (!context.AuthUser) {
        await next();
        return undefined;
    }

    if (context.is_developer) {
        return next();
    }

    try {
        // relation type: "ModelName">"related ModelName"
        const { AccessControlListModel } = context.models;

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
        console.log(from_model_type, '>', current_field);
        // console.log(info)
        if (from_model_type && current_field) {

            const field_type_prefix = '#';

            from_model_type = String(from_model_type).replace(/\[\]!/g, '');
            current_field = String(current_field).replace(/\[\]!/g, '');
            const str_model = field_type_prefix + `${from_model_type}>${current_field}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape for regex
            const regex_pattern_model_type = `^${str_model}$|^${str_model}&&|&&${str_model}$|&&${str_model}&&`;

            const str_path = field_type_prefix + current_path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape for regex
            const regex_pattern_path = `^${str_path}$|^${str_path}&&|&&${str_path}$|&&${str_path}&&`;

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
                    '$or': [
                        { access_component_action: { '$regex': regex_pattern_model_type } },
                        { access_component_action: { '$regex': regex_pattern_path } },
                    ]
                });
            } catch {
                accessControlList_exists = false;
            }

            if (!accessControlList_exists) {
                next();
                return undefined;
            }
        }

        // access granted
        return next();
    } catch (e) {
        return undefined;
    }
};

module.exports = {
    typeDefs,
    access,
};
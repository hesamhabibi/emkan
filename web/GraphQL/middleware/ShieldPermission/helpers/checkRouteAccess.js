// route type: "QueryKey"@"input1(nested with dot)":"value1","input2":"value2",...
// separate with && sign

// below examples are valid for 'getAccess' route:
// getAccess
// getAccess@key.key2=value
// getAccess&&getBlog@key=value
// getAccess@key=value&&getBlog@key=value
// getBlog&&getAccess

module.exports = async (parent, args, context, info) => {
    const { access_id } = context.AuthUser;
    if (!access_id)
        return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);

    const { AccessControlListModel } = context.models;

    try {
        let current_field_name;
        try {
            current_field_name = info.fieldName;
        } catch {
            return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);
        }

        let accessControlLists;
        try {
            const f = current_field_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape for regex
            const regex_pattern = `^${f}$|^${f}&&|^${f}@.*|&&${f}$|&&${f}&&|&&${f}@.*`;

            accessControlLists = await AccessControlListModel.find({
                access_id,
                access_component_action: { '$regex': regex_pattern }, // start with current_field_name
            });
        } catch {
            accessControlLists = [];
        }

        let found_true_access = false;

        for (let a = 0; a < accessControlLists.length; a += 1) {
            const accessControlList = accessControlLists[a];

            const { access_component_action } = accessControlList;
            let has_access = true;

            if (access_component_action.includes('@')) {
                const parts = access_component_action.split('@');
                const params = parts[1].split(',');

                for (let i = 0; i < params.length; i += 1) {
                    const param = params[i].split('=');
                    if (param.length !== 2) {
                        has_access = false;
                        break;
                    }

                    let value;
                    try {
                        if (param[0].includes('.')) {
                            const keys = param[0].split('.');
                            value = args[keys[0]];
                            for (let j = 1; j < keys.length; j += 1) {
                                value = value[keys[j]];
                            }

                        }
                        else {
                            value = args[param[0]];
                        }
                    } catch {
                        value = undefined;
                    }

                    if (value === undefined || String(value) !== param[1]) {
                        has_access = false;
                        break;
                    }
                }
            }
            if (has_access) {
                found_true_access = true;
                break;
            }
        }

        if (!found_true_access) {
            return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);
        }

        // access granted
        return true;

    } catch {
        return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);
    }

};
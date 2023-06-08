// relation type: "ModelName">"related ModelName"
// examples:
// Blog>User

module.exports = async (parent, args, context, info) => {

    const { access_id } = context.AuthUser;
    if (!access_id)
        return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);

    const { AccessComponentModel, AccessControlListModel } = context.models;

    let from_model_type;
    let current_model_type;
    try {
        from_model_type = info.parentType;
        current_model_type = info.returnType;
    } catch {
        from_model_type = null;
        current_model_type = null;
    }

    const native_types = [ // skip this types
        'String',
        'Int',
        'ID',
        'Boolean',
    ];

    if (from_model_type && current_model_type && !native_types.includes(current_model_type)) {

        from_model_type = String(from_model_type).replace(/\[\]!/g, '');
        current_model_type = String(current_model_type).replace(/\[\]!/g, '');
        let accessComponent_exists;
        try {
            // check if any accessComponent defined for this relation
            accessComponent_exists = await AccessComponentModel.exists({
                action_type: AccessComponentModel.action_types.gql_rel,
                action: `${from_model_type}>${current_model_type}`,
            });
        } catch {
            accessComponent_exists = false;
        }

        if (accessComponent_exists) { // skip if no component found for this route

            let accessControlList_exists;
            try {
                accessControlList_exists = await AccessControlListModel.exists({
                    access_id,
                    access_component_action: `${from_model_type}>${current_model_type}`,
                });
            } catch {
                accessControlList_exists = false;
            }

            if (!accessControlList_exists)
                return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);
        }
        // access granted
        return true;
    }

    return context.helpers.ErrorHelper.error_res_return(context.trans('access_error'), {}, process.env.ERROR_CODE_FORBIDDEN);
};
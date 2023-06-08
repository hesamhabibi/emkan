/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { AccessComponentModel, AccessModel, AccessControlListModel }, error_res, trans }) => {
    const { access_id } = args;

    // find access
    let access;
    try { access = await AccessModel.findById(access_id); }
    catch (e) { access = null; }
    // check access exists
    if (!access)
        error_res(trans("not_exists_error", { attr: 'access_model' }));

    // prepare ACL
    const accessComponents = [];

    const errors = {};
    for (let i = 0; i < args.accessComponents.length; i += 1) {
        // find accessComponent
        let accessComponent;
        try { accessComponent = await AccessComponentModel.findById(args.accessComponents[i].id); }
        catch (e) { accessComponent = null; }
        // check accessComponent exists
        if (!accessComponent) {
            const error_key = `accessComponents.${i}`;
            errors[error_key] = [trans("not_exists_error", { attr: 'access_component' })];
            continue;
        }
        accessComponent.has_access = args.accessComponents[i].has_access;
        accessComponents.push(accessComponent);
    }

    for (let i = 0; i < accessComponents.length; i += 1) {
        if (accessComponents[i].has_access) {
            // check if exists
            if (!(await AccessControlListModel.exists({ access_id, access_component_id: accessComponents[i]._id }))) {
                const input = {
                    access_id,
                    access_component_id: accessComponents[i]._id,
                    access_component_key: accessComponents[i].key,
                    access_component_type: accessComponents[i].type,
                    access_component_action_type: accessComponents[i].action_type,
                    access_component_action: accessComponents[i].action,
                };
                try { await AccessControlListModel.create(input); }
                catch { continue; }
            }
        } else {
            try { await AccessControlListModel.deleteMany({ access_id, access_component_id: accessComponents[i]._id }); }
            catch { continue; }
        }
    }

    if (Object.keys(errors).length > 0)
        error_res(trans('validation_error'), errors);

    return {
        success: true,
        message: trans('done'),
    };
};
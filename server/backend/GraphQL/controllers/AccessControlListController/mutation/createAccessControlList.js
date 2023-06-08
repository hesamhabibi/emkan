const { collect } = require('collect.js');

module.exports = async (parent, args, { models: { AccessComponentModel, AccessModel, AccessControlListModel }, error_res, trans }) => {
    // get input
    const input = collect(args.input).only(['access_id', 'access_component_id']).all();

    // custom validations
    const errors = {};
    // find access
    let access;
    try { access = await AccessModel.findById(input.access_id); }
    catch (e) { access = null; }
    // check access exists
    if (!access)
        errors.access_id = [trans("not_exists_error", { attr: 'access_model' })];

    // find accessComponent
    let accessComponent;
    try { accessComponent = await AccessComponentModel.findById(input.access_component_id); }
    catch (e) { accessComponent = null; }
    // check accessComponent exists
    if (!accessComponent)
        errors.access_component_id = [trans("not_exists_error", { attr: 'access_component' })];

    // check validation
    if (Object.keys(errors).length > 0) {
        error_res(trans('validation_error'), errors);
    }

    // input.access_type = access.type;
    input.access_component_key = accessComponent.key;
    input.access_component_type = accessComponent.type;
    input.access_component_action_type = accessComponent.action_type;
    input.access_component_action = accessComponent.action;

    let exists;
    try {
        exists = await AccessControlListModel.exists({ access_id: access.id, access_component_id: accessComponent.id });
    } catch {
        exists = false;
    }
    if (exists)
        error_res(trans('not_unique_error', { attr: 'access_control_list' }));

    // create accessControlList
    const accessControlList = await AccessControlListModel.create(input);
    return accessControlList;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AccessComponentModel, AccessControlListModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find accessComponent
    let accessComponent;
    try {
        accessComponent = await AccessComponentModel.findById(args.id);
    } catch (e) {
        accessComponent = null;
    }
    // check accessComponent exists
    if (!accessComponent)
        error_res(trans('not_found', { attr: "access_component" }));

    // get input
    const input = collect(args.input).only(['name', 'type', 'key', 'action', 'field', 'description', 'sort', 'parent_id', 'kind_status']).all();

    // validate input :
    const rules = {
        // name: 'min:1',
        type: [{ in: Object.values(AccessComponentModel.types) }],
        action: ['string'],
        key: [{ 'unique': { model: AccessComponentModel, field: 'key', query: { _id: { "$ne": args.id }, type: input.type } } }],
        parent_id: [{ 'exists': { model: AccessComponentModel, field: '_id', attr: 'access_component' } }],
        kind_status: ['required', { in: Object.values(AccessComponentModel.kind_statuses) }],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update accessComponent
    await accessComponent.set(input).save();

    try { // update ACL
        await AccessControlListModel.updateMany({ access_component_id: accessComponent.id }, {
            access_component_type: accessComponent.type,
            access_component_key: accessComponent.key,
            access_component_action_type: accessComponent.action_type,
            access_component_action: accessComponent.action,
        });
    } catch (e) {
        console.log('in update access component:', e);
    }

    return accessComponent;
};
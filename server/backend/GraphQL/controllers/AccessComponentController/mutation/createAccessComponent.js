const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { AccessComponentModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['name', 'type', 'key', 'action', 'field', 'description', 'sort', 'parent_id', 'kind_status']).all();

    // validate input :
    const rules = {
        name: 'required',
        type: ['required', { in: Object.values(AccessComponentModel.types) }],
        action: ['string'],
        key: [{ 'unique': { model: AccessComponentModel, field: 'key', query: { type: input.type } } }],
        parent_id: [{ 'exists': { model: AccessComponentModel, field: '_id', attr: 'access_component' } }],
        kind_status: ['required', { in: Object.values(AccessComponentModel.kind_statuses) }],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    if (!input['sort']) {
        if (input.type === AccessComponentModel.types.column)
            input['sort'] = 9999;
        if (input.type === AccessComponentModel.types.action)
            input['sort'] = 999;
    }

    // create accessComponent
    const accessComponent = await AccessComponentModel.create(input);
    return accessComponent;
};
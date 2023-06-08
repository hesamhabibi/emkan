const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { MenuItemModel, AccessModel, AccessComponentModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['title', 'icon', 'sort', 'show_in_menu', 'badge_key', 'access_id', 'access_component_id', 'parent_id']).all();

    // validate input :
    const rules = {
        title: 'required',
        sort: 'integer',
        show_in_menu: 'boolean',
        badge_key: 'string',
        access_id: ['required', { 'exists': { model: AccessModel, field: '_id' } }],
        access_component_id: [{ 'exists': { model: AccessComponentModel, field: '_id', query: { type: AccessComponentModel.types.menu_item } } }],
        parent_id: [{ 'exists': { model: MenuItemModel, field: '_id' } }],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // create menu item
    const menu_item = await MenuItemModel.create(input);
    return menu_item;
};
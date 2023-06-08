const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { MenuItemModel, AccessModel, AccessComponentModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find menu_item
    let menu_item;
    try {
        menu_item = await MenuItemModel.findById(args.id);
    } catch (e) {
        menu_item = null;
    }
    // check menu_item exists
    if (!menu_item)
        error_res(trans('not_found', { attr: "menu_item" }));

    // get input
    const input = collect(args.input).only(['title', 'icon', 'sort', 'show_in_menu', 'badge_key', 'access_id', 'access_component_id', 'parent_id']).all();

    // validate input :
    const rules = {
        title: 'required',
        sort: 'integer',
        show_in_menu: 'boolean',
        badge_key: 'string',
        access_id: ['required', { 'exists': { model: AccessModel, field: '_id' } }],
        access_component_id: [{ 'exists': { model: AccessComponentModel, field: '_id' } }],
        parent_id: [{ 'exists': { model: MenuItemModel, field: '_id' } }],
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // update menu_item
    await menu_item.update(input);
    return await MenuItemModel.findById(menu_item.id);
};
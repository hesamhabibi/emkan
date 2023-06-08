const { sort_query } = require('@common/helpers/SortHelper');
const { collect } = require('collect.js');

module.exports = async (parent, args, { models: { AccessComponentModel, AccessControlListModel }, helpers: { FilterHelper: { filter_query }, ArrayHelper: { get_children_flat } }, error_res, trans }) => {
    // find accessComponent
    let accessComponent;
    try {
        accessComponent = await AccessComponentModel.findById(args.parent_id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        accessComponent = null;
    }

    // check accessComponent exists
    if (!accessComponent)
        error_res(trans('not_found', { attr: "access_component" }));

    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "sort", type: 1 });
    const all_accessComponents = await AccessComponentModel.find(query).sort(sort).lean({ virtuals: true, defaults: true });

    const accessComponents = get_children_flat(accessComponent, all_accessComponents);

    // add ACL
    if (args.access_id) {
        let all_accessControlLists;
        try {
            all_accessControlLists = collect(await AccessControlListModel.find({ access_id: args.access_id }).lean() || []);
        } catch {
            all_accessControlLists = null;
        }
        if (all_accessControlLists) {
            for (let i = 0; i < accessComponents.length; i += 1) {
                const exists = all_accessControlLists.filter(item => { return String(item.access_component_id) === String(accessComponents[i]._id); }).first();
                if (exists)
                    accessComponents[i].has_access = true;
                else
                    accessComponents[i].has_access = false;
            }
        }
    }

    return accessComponents;
};
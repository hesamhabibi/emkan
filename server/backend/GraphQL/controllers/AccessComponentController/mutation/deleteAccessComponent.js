module.exports = async (parent, args, { models: { AccessComponentModel, AccessControlListModel }, helpers: { ArrayHelper: { get_children_flat } }, error_res, trans }) => {
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

    const delete_component = async (access_component_id) => {
        try {
            await AccessControlListModel.deleteMany({ access_component_id });
        } catch (e) {
            console.log('delete access component: ', e);
        }
        try {
            const access_component = await AccessComponentModel.findById(access_component_id);
            await access_component.delete();
        } catch (e) {
            console.log('delete access component: ', e);
        }
    };

    // delete accessComponent
    // get all children
    const all_children = get_children_flat(accessComponent, await AccessComponentModel.find().lean());
    for (let i = 0; i < all_children.length; i += 1) {
        delete_component(all_children[i]._id);
    }

    return { success: true, message: trans('done') };
};
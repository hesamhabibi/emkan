/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { AccessComponentModel }, trans }) => {
    const access_components = args.input;
    for (let i = 0; i < access_components.length; i += 1) {
        try {
            if (access_components[i].id !== access_components[i].parent_id)
                await AccessComponentModel.findByIdAndUpdate(access_components[i].id, {
                    sort: access_components[i].sort,
                    parent_id: access_components[i].parent_id,
                });
        } catch (e) {
            console.log('in sort access component: ', e);
        }
    }
    return {
        success: true,
        message: trans('done'),
    };

};
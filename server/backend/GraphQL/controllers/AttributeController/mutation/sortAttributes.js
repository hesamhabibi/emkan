/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { AttributeModel }, trans }) => {
    const attributes = args.input;
    for (let i = 0; i < attributes.length; i += 1) {
        try {
            if (attributes[i].id !== attributes[i].parent_id)
                await AttributeModel.findByIdAndUpdate(attributes[i].id, {
                    sort: attributes[i].sort,
                });
        } catch (e) {
            console.log('in sort attributes: ', e);
        }
    }
    return {
        success: true,
        message: trans('done'),
    };
};
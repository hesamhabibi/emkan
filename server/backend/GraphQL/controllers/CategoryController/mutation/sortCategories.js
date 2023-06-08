/* eslint-disable no-await-in-loop */
module.exports = async (parent, args, { models: { CategoryModel }, trans }) => {
    const categories = args.input;
    for (let i = 0; i < categories.length; i += 1) {
        try {
            if (categories[i].id !== categories[i].parent_id)
                await CategoryModel.findByIdAndUpdate(categories[i].id, {
                    sort: categories[i].sort,
                    parent_id: categories[i].parent_id,
                });
        } catch (e) {
            console.log('in sort categories: ', e);
        }
    }
    return {
        success: true,
        message: trans('done'),
    };
};
module.exports = async (parent, args, { models: { CategoryModel }, error_res, trans }) => {

    // find category
    let category;
    try {
        category = await CategoryModel.findOne({ _id: args.category_id, active: true });
    } catch (e) {
        category = null;
    }

    // check category exists
    if (!category)
        error_res(trans('not_found', { attr: 'category' }), null, process.env.ERROR_CODE_NOTFOUND);

    return category;
};

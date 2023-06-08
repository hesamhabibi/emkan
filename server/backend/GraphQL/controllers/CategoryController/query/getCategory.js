module.exports = async (parent, args, { models: { CategoryModel }, error_res, trans }) => {
    // find category
    let category;
    try {
        category = await CategoryModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        category = null;
    }
    // check category exists
    if (!category)
        error_res(trans('not_found', { attr: "category" }));
    return category;
};
const { collect } = require('collect.js');

module.exports = async (parent, args, { models: { CategoryModel }, helpers: { SEOHelper }, error_res, trans }) => {

    // find category
    let category;
    try {
        category = await CategoryModel.findById(args.id);
    } catch (e) {
        category = null;
    }
    // check category exists
    if (!category)
        error_res(trans('not_found', { attr: "category" }));

    const input = collect(category._doc).except(['seo_id', 'id', '_id', '__v', 'createdAt', 'updatedAt']).all();

    if (args.title && Object.keys(args.title).length > 0)
        input.title = args.title;
    else {
        const keys = Object.keys(input.title);
        for (let i = 0; i < keys.length; i += 1) {
            input.title[keys[i]] = `${input.title[keys[i]]}_${trans('copy')}`;
        }
    }

    // create new category
    const new_category = await CategoryModel.create(input);
    const copy_result = await SEOHelper.copySEO(category, new_category);
    return copy_result.instance || new_category;
};
const { collect } = require('collect.js');
const { CategoryModel, FormValueModel } = require('@models');
const { get_children_flat } = require('@helpers/ArrayHelper');

const { get_tag_ids_by_tag_group_ids } = require('@helpers/TagGroupHelper');

module.exports = async (collections) => {
    const { tag_group_ids = [] } = collections;
    let { tag_ids = [] } = collections;
    const { category_ids = [] } = collections;
    const all_child_categories = [];
    const all_categories = await CategoryModel.find({});
    for (let i = 0; i < category_ids.length; i += 1) {
        const category = collect(all_categories).filter(cat => String(cat._id) === String(category_ids[i])).first();
        const child_categories = get_children_flat(category, all_categories);
        if (child_categories && child_categories.length > 0)
            all_child_categories.push(...child_categories);
    }
    const all_child_category_ids = collect(all_child_categories).pluck('_id').map(item => String(item)).unique().all() || [];

    tag_ids = await get_tag_ids_by_tag_group_ids(tag_group_ids, tag_ids);
    let form_values;
    try {
        form_values = await FormValueModel.find({ "$or": [{ category_id: { "$in": all_child_category_ids } }, { tag_ids: { "$in": tag_ids } }] });
    } catch {
        form_values = [];
    }

    return form_values;
};
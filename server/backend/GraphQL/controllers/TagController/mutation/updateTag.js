const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { TagModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find tag
    let tag;
    try {
        tag = await TagModel.findById(args.id);
    } catch (e) {
        tag = null;
    }
    // check tag exists
    if (!tag)
        error_res(trans('not_found', { attr: "tag" }));

    // get input
    const input = collect(args.input).only(['title', 'tag_group_ids', 'tag_ids']).all();

    // validate input :
    const rules = {
        title: await multilang_rules(['string'], 'web', ['required', 'string']),
        'tag_group_ids.*': [`exists:TagModel,_id,{"deep":${TagModel.deeps.tag_group}}`],
        'tag_ids.*': [`exists:TagModel,_id,{"deep":${TagModel.deeps.tag}}`],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);

    if (tag.deep === TagModel.deeps.tag_group) {
        input.tag_group_ids = null;
    }

    // update tag
    await tag.set(input).save();

    // remove from tags
    const tags = await TagModel.find({ tag_group_ids: tag._id });
    for (let old_tag of tags) {
        await old_tag.set({
            tag_group_ids: (old_tag.tag_group_ids || []).filter((t) => {
                return String(t._id) !== String(tag._id);
            })
        }).save();
    }

    if (tag.deep === TagModel.deeps.tag_group) {
        if (Array.isArray(input.tag_ids))
            for (let i = 0; i < input.tag_ids.length; i += 1) {
                try {
                    const t = await TagModel.findById(input.tag_ids[i]);
                    if (Array.isArray(t.tag_group_ids)) {
                        if (!t.tag_group_ids.find((id) => { return String(id) === String(tag._id); }))
                            await t.set({ tag_group_ids: [...t.tag_group_ids, tag._id] }).save();
                    } else {
                        await t.set({ tag_group_ids: [tag._id] }).save();
                    }
                } catch { /* empty */ }
            }
    }

    return tag;
};
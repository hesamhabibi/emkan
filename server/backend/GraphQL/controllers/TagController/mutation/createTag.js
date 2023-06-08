const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { TagModel }, helpers: { ValidationHelper }, error_res, trans }) => {

    // get input
    const input = collect(args.input).only(['title', 'deep', 'tag_group_ids', 'tag_ids']).all();

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        deep: ['required', { in: Object.values(TagModel.deeps) }],
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

    if (input.deep === TagModel.deeps.tag_group) {
        input.tag_group_ids = null;
    }

    // create tag
    const tag = await TagModel.create(input);

    if (tag.deep === TagModel.deeps.tag_group) {
        if (Array.isArray(input.tag_ids))
            for (let i = 0; i < input.tag_ids.length; i += 1) {
                try {
                    let t = await TagModel.findById(input.tag_ids[i]);
                    if (Array.isArray(t.tag_group_ids)) {
                        await t.set({ tag_group_ids: [...t.tag_group_ids, tag._id] }).save();
                    } else {
                        await t.set({ tag_group_ids: [tag._id] }).save();
                    }
                } catch { /* empty */ }
            }
    }

    return tag;
};
const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { AttributeModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find attribute
    let attribute;
    try {
        attribute = await AttributeModel.findById(args.id);
    } catch (e) {
        attribute = null;
    }
    // check attribute exists
    if (!attribute)
        error_res(trans('not_found', { attr: "attribute" }));

    // get input
    const input = collect(args.input).only(['parent_id', 'sort', 'deep', 'title', 'active', 'type', 'description', 'default_attribute_value_id', 'show_in_filter']).all();

    // validate input :
    const rules = {
        parent_id: [{ 'exists': { model: AttributeModel, field: '_id' } }],
        sort: ['integer'],
        deep: ['integer', { in: Object.values(AttributeModel.deeps) }],
        title: await multilang_rules(['string'],'web',['required', 'string']),
        active: ['boolean'],
        // deep 3
        type: ['required_if:deep,3', 'integer', { in: Object.values(AttributeModel.types) }],
        description: await multilang_rules(['string']),
        default_attribute_value_id: 'exists:AttributeValueModel,_id',
        show_in_filter: ['boolean'],
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    input.description = await multilang_remove_extra_fields(input.description);

    // check if paren_id changed
    if (String(attribute.parent_id) != String(input.parent_id)) {
        // after validated input, update parents
        if (input.deep === AttributeModel.deeps.attribute) { // update attribute_ids array of parent
            // remove attribute id from old parent
            try {
                const old_parent = await AttributeModel.findById(attribute.parent_id);
                const new_attributes_array = [];
                if (Array.isArray(old_parent.attribute_ids))
                    for (let i = 0; i < old_parent.attribute_ids.length; i += 1) {
                        if (String(old_parent.attribute_ids[i]) != String(attribute._id))
                            new_attributes_array.push(old_parent.attribute_ids[i]);
                    }
                await old_parent.update({ attribute_ids: new_attributes_array });
            } catch (e) {
                console.log('error in remove from old parent attribute array', e);
            }

            // add attribute id to new parent
            try {
                const new_parent = await AttributeModel.findById(input.parent_id);
                await new_parent.update({ attribute_ids: Array.isArray(new_parent.attribute_ids) ? [...new_parent.attribute_ids, attribute._id] : [attribute._id] });
            } catch (e) {
                console.log('error in update parent attribute array', e);
            }
        } else if (input.deep === AttributeModel.deeps.attribute_group) { // update attribute_group_ids array o parent

            // remove attribute id from old parent
            try {
                const old_parent = await AttributeModel.findById(attribute.parent_id);
                const new_attributes_array = [];
                if (Array.isArray(old_parent.attribute_group_ids))
                    for (let i = 0; i < old_parent.attribute_group_ids.length; i += 1) {
                        if (String(old_parent.attribute_group_ids[i]) != String(attribute._id))
                            new_attributes_array.push(old_parent.attribute_group_ids[i]);
                    }
                await old_parent.update({ attribute_group_ids: new_attributes_array });
            } catch (e) {
                console.log('error in remove from old parent attribute group array', e);
            }

            // add attribute id to new parent
            try {
                const new_parent = await AttributeModel.findById(input.parent_id);
                await new_parent.update({ attribute_group_ids: Array.isArray(new_parent.attribute_group_ids) ? [...new_parent.attribute_group_ids, attribute._id] : [attribute._id] });
            } catch (e) {
                console.log('error in update parent attribute group array', e);
            }
        }
    }

    // update attribute
    await attribute.set(input).save();
    return attribute;
};
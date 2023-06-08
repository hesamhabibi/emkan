const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { AttributeModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['parent_id', 'sort', 'deep', 'title', 'active', 'type', 'description', 'default_attribute_value_id', 'show_in_filter']).all();
    input.user_id = AuthUser.id;

    // validate input :
    const rules = {
        parent_id: [`required_if:deep,${AttributeModel.deeps.attribute_group}`, `required_if:deep,${AttributeModel.deeps.attribute}`, { 'exists': { model: AttributeModel, field: '_id' } }],
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

    // create attribute
    const attribute = await AttributeModel.create(input);

    // after attribute created, update parents
    if (input.deep === AttributeModel.deeps.attribute) { // update attribute_ids array of parent
        try {
            const parent = await AttributeModel.findById(input.parent_id);
            await parent.update({ attribute_ids: Array.isArray(parent.attribute_ids) ? [...parent.attribute_ids, attribute._id] : [attribute._id] });
        } catch (e) {
            console.log('error in update parent attribute array', e);
        }
    } else if (input.deep === AttributeModel.deeps.attribute_group) { // update attribute_group_ids array of parent
        try {
            const parent = await AttributeModel.findById(input.parent_id);
            await parent.update({ attribute_group_ids: Array.isArray(parent.attribute_group_ids) ? [...parent.attribute_group_ids, attribute._id] : [attribute._id] });
        } catch (e) {
            console.log('error in update parent attribute group array', e);
        }
    }

    return attribute;
};
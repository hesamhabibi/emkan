const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const { multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { CollectionModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {

    // get input
    const input = collect(args.input).only(['type', 'condition', 'list', 'extra_fields']).all();
    try { input.condition = collect(input.condition).only(['model_name', 'limit', 'logic', 'orders', 'wheres']).all(); } catch { /* empty */ }
    try { input.condition.orders = collect(input.condition.orders).map((item) => { return collect(item).only(['type', 'field']).all(); }).all(); } catch { /* empty */ }
    try { input.condition.wheres = collect(input.condition.wheres).map((item) => { return collect(item).only(['operator', 'where_field', 'where_value']).all(); }).all(); } catch { /* empty */ }
    try { input.list = collect(input.list).map((item) => { return collect(item).only(['product_id', 'has_variant_key', 'mix_variant_keys', 'sort', 'show', 'expireAt']).all(); }).all(); } catch { /* empty */ }
    try { input.extra_fields = collect(input.extra_fields).only(['title']).all(); } catch { /* empty */ }
    input.user_id = AuthUser.id;
    input.type = CollectionModel.types.static;
    input.source = CollectionModel.sources.related_product;

    // validate input :
    const rules = {
        type: ['required', { in: Object.values(CollectionModel.types) }],
        condition: {
            model_name: 'string',
            limit: 'integer',
            logic: [`required_if:type,${CollectionModel.types.dynamic}`, { in: Object.values(CollectionModel.logics) }],
            'orders.*': {
                type: ['required', `in:${Object.values(CollectionModel.orders_types)}`],
                field: ['required', 'string'],
            },
            'wheres.*': {
                operator: ['required', `in:${Object.values(CollectionModel.wheres_operators)}`],
                where_field: ['required', 'string'],
                // 'where_value': "JSON", // todo: escape value for mongo query
            }
        },
        'list.*': {
            product_id: ['required', 'exists:ProductModel,_id'],
            has_variant_key: ['boolean'],
            'mix_variant_keys.*': 'string',
            sort: 'integer',
            show: ['boolean'],
            expireAt: 'timestamp',
        },
        extra_fields: {
            title: await multilang_rules(['string']),
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    // remove extra fields:
    if (input?.extra_fields?.title)
        input.extra_fields.title = await multilang_remove_extra_fields(input.extra_fields.title);

    // create collection
    const collection = await CollectionModel.create(input);

    return collection;
};
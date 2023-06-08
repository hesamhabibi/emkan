const { collect } = require("collect.js");
const Validatorjs = require("validatorjs");
const SlugHelper = require("@helpers/SlugHelper");
const { extract_main_title, multilang_rules, multilang_remove_extra_fields } = require('@helpers/MultiLangHelper');

module.exports = async (parent, args, { models: { FormModel }, helpers: { ValidationHelper }, error_res, trans }) => {
    // find form
    let form;
    try {
        form = await FormModel.findById(args.id);
    } catch (e) {
        form = null;
    }
    // check form exists
    if (!form) error_res(trans("not_found", { attr: "form" }));

    // get input
    const input = collect(args.input).only(["title", "name", "fields"]).all();
    const new_fields = [];
    for (let i = 0; i < input.fields.length; i += 1) {
        new_fields.push(
            collect(args.input.fields[i])
                .only([
                    "label",
                    /* 'name',  */
                    "size",
                    "default_value",
                    "data",
                    "field_type_id",
                    "field_validation_ids",
                ])
                .all()
        );
    }
    input.fields = new_fields;

    // validate input :
    const rules = {
        title: await multilang_rules(['string'],'web',['required', 'string']),
        name: 'string',
        "fields.*": {
            label: await multilang_rules(['string'],'web',['required', 'string']),
            name: 'string',
            size: ["required", 'string'],
            // default_value: '',
            "data.*": {
                name: await multilang_rules(['string'],'web',['required', 'string']),
                id: 'string',
            },
            field_type_id: ["required", "exists:FieldTypeModel,_id"],
            "field_validation_ids.*": ["required", "exists:FieldValidationModel,_id"],
        },
    };

    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans("validation_error"), validation_result.errors);
    }

    // remove extra fields:
    input.title = await multilang_remove_extra_fields(input.title);
    if (Array.isArray(input.fields))
        for (let i = 0; i < input.fields.length; i += 1) {
            input.fields[i].label = await multilang_remove_extra_fields(input.fields[i].label);
            if (Array.isArray(input.fields[i].data))
                for (let j = 0; j < input.fields[i].data.length; j += 1)
                    input.fields[i].data[j].name = await multilang_remove_extra_fields(input.fields[i].data[j].name);
        }

    // create auto names
    if (!input.name)
        input.name = extract_main_title(input.title);
    for (let i = 0; i < input.fields.length; i += 1) {
        if (!input.fields[i].name) {
            input.fields[i].name = SlugHelper.convert_to_english_variable_name(
                extract_main_title(input.fields[i].label)
            );
        }
        if (Array.isArray(input.fields[i].data))
            for (let j = 0; j < input.fields[i].data.length; j += 1) {
                if (!input.fields[i].data[j].id)
                    input.fields[i].data[j].id = extract_main_title(input.fields[i].data[j].name);
            }
    }

    // update form
    await form.set(input).save();
    return form;
};

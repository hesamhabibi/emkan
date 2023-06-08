module.exports = async (parent, args, { models: { FormModel, FieldTypeModel }, error_res, trans }) => {
    // find form
    let form;
    try {
        form = await FormModel.findById(args.form_id);
    } catch (e) {
        form = null;
    }
    // check form exists
    if (!form)
        error_res(trans('not_found', { attr: "form" }));

    const fields = form.fields.sort((a, b) => (a.sort - b.sort) || 0);
    const front_fields = [];

    // todo: custom mandatory field
    const form_value_name_field = {
        "label": 'نام فرم',
        "size": 12,
        "input_type": 'text',
        'text': true,
        "name": 'form_value_name',
        "options": {
            // "required": true,
        },
        "data": null,
    };
    front_fields.push(form_value_name_field);

    for (let i = 0; i < fields.length; i += 1) {
        const field = form.fields[i];
        let field_type;
        try {
            field_type = await FieldTypeModel.findById(field.field_type_id);
        } catch {
            field_type = null;
        }
        if (field_type.type) {
            const front_field = {
                "label": field.label,
                "size": field.size,
                "input_type": field_type.type,
                [field_type.type]: true,
                "name": field.name,
                "options": {
                    // "required": field.required || false,
                },
                "data": field.data,
            };
            front_fields.push(front_field);
        }
    }

    return [
        { // tabs
            title: form.title,
            form: front_fields,
        }
    ];
};
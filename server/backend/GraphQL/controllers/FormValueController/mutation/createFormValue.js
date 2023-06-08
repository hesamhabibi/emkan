const Validatorjs = require('validatorjs');
const { collect } = require('collect.js');

module.exports = async (parent, args, { models: { FormValueModel, FormModel, FieldValidationModel, FieldTypeModel, MediaModel, CategoryModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // find category
    let category;
    try {
        category = await CategoryModel.findById(args.category_id);
    } catch (e) {
        category = null;
    }

    // find form
    let form;
    if (category) {
        try {
            form = await FormModel.findById(category.form_id);
        } catch (e) {
            form = null;
        }
        // check form exists
        if (!form)
            error_res(trans('not_found', { attr: "form" }));
    } else {
        try {
            form = await FormModel.findById(args.form_id);
        } catch (e) {
            form = null;
        }
        // check form exists
        if (!form)
            error_res(trans('not_found', { attr: "form" }));
    }

    const { input } = args;
    if (!input || typeof input !== 'object')
        error_res(trans('validation_error'));

    // validate form values:
    const form_rules = {};
    const form_values = {};

    // todo: custom mandatory field
    form_values.form_value_name = JSON.stringify(input.form_value_name);

    const image_gallery_values = [];

    for (let i = 0; i < form.fields.length; i += 1) {
        const field = form.fields[i];
        let field_validations;
        try {
            field_validations = await FieldValidationModel.find({ _id: { "$in": field.field_validation_ids } });
        } catch {
            field_validations = null;
        }
        if (field_validations) {
            const validation_rules = [];

            for (let j = 0; j < field_validations.length; j += 1) {
                const { validation_rule } = field_validations[j];
                validation_rules.push(validation_rule);
            }

            form_rules[field.name] = validation_rules;
            form_values[field.name] = JSON.stringify(input[field.name]);
        }

        // save image gallery values to update DB after validation pass
        let field_type;
        try {
            field_type = await FieldTypeModel.findById(field.field_type_id);
        } catch {
            field_type = null;
        }
        if (field_type.type === 'image_gallery')
            image_gallery_values.push(input[field.name]);
    }

    const form_validation = new Validatorjs(form_values, form_rules);
    const form_validation_result = await ValidationHelper.checkAsync(form_validation);

    // check form validation
    if (!form_validation_result.pass) {
        error_res(trans('validation_error'), form_validation_result.errors);
    }

    // update media_gallery
    for (let i = 0; i < image_gallery_values.length; i += 1) {
        const gallery = image_gallery_values[i];
        for (let j = 0; j < gallery.length; j += 1) {
            try {
                await MediaModel.findByIdAndUpdate(gallery[j].media_id, {
                    sort: gallery[j].sort,
                    main: gallery[j].main,
                    alt: gallery[j].alt,
                });
            } catch (e) {
                console.log('in update media_gallery', e);
            }
        }
    }

    const new_input = {};

    new_input.fields = form_values;
    new_input.field_labels = collect(form.fields).map(item => item.toJSON()).map(item => collect(item).only(['label', 'name']).all()).all();
    new_input.user_id = AuthUser.id;
    if (category)
        new_input.form_id = category.form_id;
    else
        new_input.form_id = args.form_id;

    // find category
    try {
        new_input.category_id = category._id;
        new_input.tag_ids = category.tag_ids;
    } catch (e) {
        new_input.tag_ids = [];
    }

    // create form_value
    const form_value = await FormValueModel.create(new_input);
    return form_value;
};
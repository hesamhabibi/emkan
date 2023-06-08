module.exports = async (parent, args, { models: { FormValueModel }, error_res, trans }) => {
    // find form_value
    let form_value;
    try {
        form_value = await FormValueModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        form_value = null;
    }
    // check form_value exists
    if (!form_value)
        error_res(trans('not_found', { attr: "form_value" }));
    return form_value;
};
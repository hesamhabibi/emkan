module.exports = async (parent, args, { models: { AttributeValueModel }, error_res, trans }) => {
    // find attribute_value
    let attribute_value;
    try {
        attribute_value = await AttributeValueModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        attribute_value = null;
    }
    // check attribute_value exists
    if (!attribute_value)
        error_res(trans('not_found', { attr: "attribute_value" }));
    return attribute_value;
};
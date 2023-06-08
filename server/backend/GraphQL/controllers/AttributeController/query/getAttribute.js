module.exports = async (parent, args, { models: { AttributeModel }, error_res, trans }) => {
    // find attribute
    let attribute;
    try {
        attribute = await AttributeModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        attribute = null;
    }
    // check attribute exists
    if (!attribute)
        error_res(trans('not_found', { attr: "attribute" }));
    return attribute;
};
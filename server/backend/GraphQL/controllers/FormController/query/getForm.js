module.exports = async (parent, args, { models: { FormModel }, error_res, trans }) => {
    // find form
    let form;
    try {
        form = await FormModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        form = null;
    }
    // check form exists
    if (!form)
        error_res(trans('not_found', { attr: "form" }));
    return form;
};
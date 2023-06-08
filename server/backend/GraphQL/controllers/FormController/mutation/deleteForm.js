module.exports = async (parent, args, { models: { FormModel, CategoryModel }, error_res, trans }) => {
    // find form
    let form;
    try {
        form = await FormModel.findById(args.id);
    } catch (e) {
        form = null;
    }
    // check form exists
    if (!form)
        error_res(trans('not_found', { attr: "form" }));
    // delete form
    // set to null Category > form_id
    try {
        await CategoryModel.updateMany({ form_id: form.id }, { form_id: null });
    } catch (e) {
        console.log(e);
    }
    await form.delete();
    return { success: true, message: trans('done') };
};
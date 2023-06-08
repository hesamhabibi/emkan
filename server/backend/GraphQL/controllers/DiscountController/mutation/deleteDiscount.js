module.exports = async (parent, args, { models: { DiscountModel }, error_res, trans }) => {
    // find discount
    let discount;
    try {
        discount = await DiscountModel.findById(args.id);
    } catch (e) {
        discount = null;
    }
    // check discount exists
    if (!discount)
        error_res(trans('not_found', { attr: "discount" }));
    // delete discount
    await discount.delete();
    return { success: true, message: trans('done') };
};
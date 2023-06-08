module.exports = async (parent, args, { models: { DiscountModel }, error_res, trans }) => {
    // find discount
    let discount;
    try {
        discount = await DiscountModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        discount = null;
    }
    // check discount exists
    if (!discount)
        error_res(trans('not_found', { attr: "discount" }));
    return discount;
};
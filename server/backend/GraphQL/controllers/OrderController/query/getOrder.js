module.exports = async (parent, args, { models: { OrderModel }, error_res, trans }) => {
    // find order
    let order;
    try {
        order = await OrderModel.findById(args.id).lean({ virtuals: true, defaults: true });
    } catch (e) {
        order = null;
    }
    // check order exists
    if (!order)
        error_res(trans('not_found', { attr: "order" }));
    return order;
};
module.exports = async (parent, args, { models: { OrderModel }, error_res, trans, AuthUser }) => {

    let order;
    try {
        order = await OrderModel.findOne({ _id: args.order_id, user_id: AuthUser._id });
    } catch (e) {
        order = null;
    }

    if (!order)
        error_res(trans('not_found', { attr: 'order' }), null, process.env.ERROR_CODE_NOTFOUND);

    return order;
};
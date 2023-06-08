module.exports = async (parent, args, { models: { OrderModel }, error_res, trans, AuthUser }) => {

    try {
        const userOrder = await OrderModel.findOne(
            {
                user_id: AuthUser._id,
                type: OrderModel.types.cart,
                is_inquiry: args.is_inquiry,
            });

        return userOrder || { products: [] };
    } catch (err) {
        return error_res(trans('server_error'), err.message);
    }

};
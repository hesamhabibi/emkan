const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { OrderModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // get input
    const input = collect(args).only(['product_id', 'mix_variant','is_inquiry']).all();


    // validate input :
    const rules = {
        product_id: 'required',
        mix_variant: 'required',
        is_inquiry: 'required',
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    await OrderModel.updateOne(
        {
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: input.is_inquiry,
            'products.product_id': input.product_id,
            'products.mix_variant_keys': input.mix_variant,
        },
        {
            $pull: {
                products: {
                    product_id: input.product_id,
                    mix_variant_keys: input.mix_variant,
                }
            }
        }, { multi: true });

    const userOrder = await OrderModel.findOne(
        {
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: input.is_inquiry,
        });

    if (!userOrder) {
        const order = await OrderModel.create({
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: input.is_inquiry,
            products: []
        });

        return order;
    }
    return userOrder;
};
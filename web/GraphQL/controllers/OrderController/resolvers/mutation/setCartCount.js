const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');
const mongoose = require('mongoose');

module.exports = async (parent, args, { models: { OrderModel }, helpers: { ValidationHelper }, error_res, trans, AuthUser }) => {
    // get input
    const input = collect(args).only(['product_id', 'count', 'mix_variant','is_inquiry']).all();

    let productsArray = [];

    try {
        input.product_id = mongoose.Types.ObjectId(input.product_id);
    } catch {
        input.product_id = null;
    }

    // validate input :
    const rules = {
        product_id: 'required',
        count: 'required',
        mix_variant: 'required',
        is_inquiry: input.is_inquiry,
    };
    const validation = new Validatorjs(input, rules);
    const validation_result = await ValidationHelper.checkAsync(validation);

    // check validation
    if (!validation_result.pass) {
        error_res(trans('validation_error'), validation_result.errors);
    }

    const userOrder = await OrderModel.findOne(
        {
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: input.is_inquiry,
        });

    let order;
    if (!userOrder) {

        productsArray.push({
            product_id: input.product_id,
            count: input.count,
            mix_variant_keys: input.mix_variant,
        });

        input.user_id = AuthUser._id;
        input.type = OrderModel.types.cart;
        input.number = 123; // todo: generate order number
        input.products = productsArray;

        order = await OrderModel.create(input);

        return order;
    } else {
        order = await OrderModel.findOne({
            user_id: AuthUser._id,
            type: OrderModel.types.cart,
            is_inquiry: input.is_inquiry,
            products: {
                $elemMatch: {
                    'product_id': input.product_id,
                    'mix_variant_keys': input.mix_variant,
                }
            }
        });

        if (order) {
            const updatedOrder = await OrderModel.findOneAndUpdate(
                {
                    _id: order._id,
                    products: {
                        $elemMatch: {
                            'product_id': input.product_id,
                            'mix_variant_keys': input.mix_variant,
                        }
                    }
                },
                {
                    $set: { 'products.$.count': input.count > 0 ? input.count : 0 }
                },
                {
                    new: true
                }
            );
            return updatedOrder;

        } else if (!order) {
            const userOrder = await OrderModel.findOne({
                user_id: AuthUser._id,
                type: OrderModel.types.cart,
                is_inquiry: input.is_inquiry,
            });

            productsArray = userOrder.products.filter((el) => {
                return el?.product_id;
            });

            productsArray.push({
                product_id: input.product_id,
                count: input.count,
                mix_variant_keys: input.mix_variant,
            });

            const updatedOrder = await OrderModel.findOneAndUpdate(
                {
                    user_id: AuthUser._id,
                    type: OrderModel.types.cart,
                    is_inquiry: input.is_inquiry,
                },
                { $set: { products: productsArray } },
                {
                    new: true
                }
            );

            return updatedOrder;
        }
    }
};
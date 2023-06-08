const { collect } = require('collect.js');
const Validatorjs = require('validatorjs');

module.exports = async (parent, args, { models: { ProductModel }, helpers: { ValidationHelper, PriceHelper }, error_res, trans }) => {

    let success_update_count = 0;
    const validation_errors = {};
    for (let index in args.input) {
        try {
            // find product
            let product;
            try {
                product = await ProductModel.findOne({
                    _id: args.input[index].product_id,
                    "mix_variant.keys": args.input[index].keys,
                });
            } catch (e) {
                product = null;
            }
            // check product exists
            if (!product) {
                validation_errors[index] = { default_error: [trans('not_found', { attr: "product" })] };
                continue;
                // error_res(trans('not_found', { attr: "product" }));
            }

            // get input
            const input = collect(args.input[index]).only(['is_active', 'details', 'price']).all();

            // validate input :
            const rules = {
                is_active: ['required', 'boolean'],
                details: {
                    product_code: 'string', // todo: unique
                    warehouse: 'string',
                    count: 'integer',
                    count_status: 'integer',
                    count_unit: 'integer',
                    limit_min: 'integer',
                    limit_max: 'integer',
                    length: 'integer',
                    width: 'integer',
                    height: 'integer',
                    weight: 'integer',
                },
                price: PriceHelper.validation_rules,
            };

            const validation = new Validatorjs(input, rules);
            const validation_result = await ValidationHelper.checkAsync(validation);

            // check validation
            if (!validation_result.pass) {
                validation_errors[index] = validation_result.errors;
                continue;
                // error_res(trans('validation_error'), validation_result.errors);
            }

            const updates = {
                "mix_variant.$.is_active": input.is_active,
                "mix_variant.$.details": input.details,
            };

            // create price
            const { price } = await PriceHelper.createVariantPrice({ model_id: product._id, model_name: ProductModel.modelName, model_variant_keys: args.input[index].keys }, input.price);

            if (price) {
                updates["mix_variant.$.price_id"] = price._id;
            }

            // update product
            await ProductModel.updateOne({
                _id: args.input[index].product_id,
                "mix_variant.keys": args.input[index].keys,
            }, {
                $set: updates,
            });

            // return await ProductModel.findById(product.id);
            success_update_count += 1;
        } catch (e) {
            console.log('error in update product:', e);
        }
    }
    if (Object.keys(validation_errors).length > 0) {
        error_res(trans('validation_error'), validation_errors);
    }
    return { success: true, message: trans('done'), extra: success_update_count };
};
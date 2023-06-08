const { arrays_equal } = require('@helpers/ArrayHelper');

const make_unique_mix_variant_key_function = function (_id, mix_variant_keys_arr) {
    // return product_id + mix_variant.keys
    const id = _id.valueOf();
    let mix_variant_keys;
    try {
        mix_variant_keys = mix_variant_keys_arr.toString();
    } catch (e) {
        mix_variant_keys = '--';
    }
    return id + '-' + mix_variant_keys;
}

const calculate_sum = async function () {
    const { ProductModel, OrderModel } = require("@models");
    const product_ids = [];
    const mix_variant_unique_keys = []
    for (let i in this.products) {
        product_ids.push(this.products[i].product_id);
        mix_variant_unique_keys.push(make_unique_mix_variant_key_function(this.products[i].product_id, this.products[i].mix_variant_keys));
    }

    // console.log(this);
    // console.log(await OrderModel.find({}));

    const aggregate_query = [
        {
            $match: {
                "_id": {
                    $in: product_ids,
                }
            }
        },
        {
            $unwind: {
                path: "$mix_variant",
            }
        },
        {
            $addFields: { // add mix_variant_unique_key
                mix_variant_unique_key: {
                    $function: {
                        body: make_unique_mix_variant_key_function,
                        args: ['$_id', '$mix_variant.keys'],
                        lang: 'js'
                    }
                }
            }
        },
        {
            $match: { // find mix_variants
                "mix_variant_unique_key": {
                    $in: mix_variant_unique_keys,
                },
            }
        },
        {
            $lookup: { // price relation to mix_variant
                from: 'prices',
                localField: 'mix_variant.price_id',
                foreignField: '_id',
                as: 'mix_variant.price'
            }
        },
        {
            $unwind: { // convert price array to object
                path: "$mix_variant.price",
            }
        },
        {
            $addFields: {
                "mix_variant": {
                    $function: {
                        body: function (mix_variant) {
                            const has_offer_price_function = (offer_price, offer_startAt, offer_expireAt) => {
                                try { offer_price = parseFloat(offer_price); }
                                catch (e) { offer_price = 0; }
                                try {
                                    if (!(offer_startAt instanceof Date))
                                        offer_startAt = new Date(parseInt(offer_startAt));
                                    if (isNaN(offer_startAt.getTime())) offer_startAt = null;
                                }
                                catch (e) { offer_startAt = null; }
                                try {
                                    if (!(offer_expireAt instanceof Date))
                                        offer_expireAt = new Date(parseInt(offer_expireAt));
                                    if (isNaN(offer_expireAt.getTime())) offer_expireAt = null;
                                }
                                catch (e) { offer_expireAt = null; }

                                if (offer_price > 0) {
                                    if ((offer_startAt && offer_startAt.getTime() < Date.now()) || !offer_startAt) {
                                        if ((offer_expireAt && offer_expireAt.getTime() > Date.now()) || !offer_expireAt) {
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            };
                            const has_offer_price = has_offer_price_function(mix_variant.price.offer_price, mix_variant.price.offer_startAt, mix_variant.price.offer_expireAt)

                            mix_variant.price.has_offer = has_offer_price;
                            if (has_offer_price)
                                mix_variant.price.main_price = mix_variant.price.offer_price;
                            else
                                mix_variant.price.main_price = mix_variant.price.price;
                            return mix_variant;
                        },
                        args: ["$mix_variant"],
                        lang: "js"
                    }
                }
            }
        }
    ];

    const products = await ProductModel.aggregate(aggregate_query);

    let sum_product_price = 0;
    let sum_product_price_without_offer = 0;
    let total_weight = 0;
    let total_count = 0;

    const new_order_products = [];

    for (let i in this.products) { // todo: check for bugs and errors
        try {
            const product = products.find((product) => {
                if (String(product._id) == String(this.products[i].product_id))
                    if (arrays_equal(product.mix_variant.keys, this.products[i].mix_variant_keys))
                        return true;
                return false;
            });
            if (product) {
                if (this.products[i].count > 0) {
                    if (product.mix_variant.price.main_price) {
                        sum_product_price += product.mix_variant.price.main_price * this.products[i].count;
                        sum_product_price_without_offer += product.mix_variant.price.price * this.products[i].count;
                        total_weight += (products[i].mix_variant.details.weight || 0) * this.products[i].count;
                        total_count += this.products[i].count;
                        new_order_products.push(this.products[i]);
                    }
                }
            }
        } catch {
            /* empty */
        }
    }

    // update order with new filtered products
    await OrderModel.updateOne({ _id: this._id }, {
        $set: {
            products: new_order_products,
        }
    });

    // >> Calculate Discount <<


    let total_price_with_discount = sum_product_price;

    if (this.discount_id) {
        calculate_discount_result = await this.calculate_discount(this.discount_id, sum_product_price);
        total_price_with_discount = calculate_discount_result.price_with_discount;
    }

    // >> Calculate PostPrice <<
    const post_price_result = await this.calculate_post_price(this.shipping_method_id, this.address_id, total_weight);

    let post_price = 0;
    let payment_price = total_price_with_discount;

    if (post_price_result.is_active) {
        post_price = post_price_result.post_price;
        payment_price = total_price_with_discount + post_price;
    }

    return {
        sum_product_price_without_offer: parseInt(sum_product_price_without_offer),
        sum_product_price: parseInt(sum_product_price),
        total_price_with_discount: parseInt(total_price_with_discount),

        post_price: parseInt(post_price),
        payment_price: parseInt(payment_price),
        
        total_weight: parseInt(total_weight),
        total_count: parseInt(total_count),
    };
};


async function calculate_discount(discount_id = null, sum_product_price = 0) {

    const { OrderModel, DiscountModel } = require("@models");

    let discount;
    try {
        discount = await DiscountModel.findById(discount_id || this.discount_id);
    } catch {
        discount = null;
    }

    if (!discount)
        return {
            success: false,
            error: 'خطا',
            price_with_discount: sum_product_price,
        };

    try {
        if (discount) {
            if (discount.status != DiscountModel.statuses.active)
                return {
                    success: false,
                    error: 'فعال نیست',
                    price_with_discount: sum_product_price,
                };
            if (parseInt(discount.startAt) > Date.now())
                return {
                    success: false,
                    error: 'شروع نشده',
                    price_with_discount: sum_product_price,
                };
            if (parseInt(discount.expireAt) < Date.now())
                return {
                    success: false,
                    error: 'کد تخفیف منقضی شده است',
                    price_with_discount: sum_product_price,
                };
            if (discount.max_price && discount.max_price < sum_product_price)
                return {
                    success: false,
                    error: 'حداکثر خرید راعایت نشده',
                    price_with_discount: sum_product_price,
                };
            if (discount.min_price && discount.min_price > sum_product_price)
                return {
                    success: false,
                    error: 'حداقل خرید رعایت نشده',
                    price_with_discount: sum_product_price,
                };
            if (discount.use_limit?.type) {
                if (discount.use_limit?.type == DiscountModel.use_limit_types.user) {
                    const order_count = await OrderModel.find({
                        type: OrderModel.types.complete,
                        is_inquiry: false,
                        user_id: this.user_id,
                        discount_id: discount._id
                    });
                    if (order_count.length > discount.use_limit.count)
                        return {
                            success: false,
                            error: 'تعداد استفاده برای شما تکمیل شده است',
                            price_with_discount: sum_product_price,
                        };
                } else if (discount.use_limit?.type == DiscountModel.use_limit_types.code) {
                    const order_count = await OrderModel.find({
                        type: OrderModel.types.complete,
                        is_inquiry: false,
                        discount_id: discount._id
                    });
                    if (order_count.length > discount.use_limit.count)
                        return {
                            success: false,
                            error: 'تعداد استفاده تکمیل شده است',
                            price_with_discount: sum_product_price,
                        };
                }
            }
            if (discount.access?.type) {
                if (discount.access?.type == DiscountModel.access_types.user) {
                    const has_access = discount.access.values.find((user_id) => { return String(user_id) == String(this.user_id) });
                    if (!has_access)
                        return {
                            success: false,
                            error: 'دسترسی ندارید',
                            price_with_discount: sum_product_price,
                        };
                } else if (discount.access?.type == DiscountModel.access_types.access) {
                    const user = await UserModel.findById(this.user_id);
                    const has_access = discount.access.values.find((access_id) => { return String(access_id) == String(user.access_id) });
                    if (!has_access)
                        return {
                            success: false,
                            error: 'دسترسی ندارید',
                            price_with_discount: sum_product_price,
                        };
                }
            }

            // access granted
            if (discount.type == DiscountModel.types.amount) {
                const new_price = sum_product_price - discount.value;
                if (new_price <= 0) {
                    return {
                        success: true,
                        error: null,
                        price_with_discount: 0,
                    };
                }
                return {
                    success: true,
                    error: null,
                    price_with_discount: parseInt(new_price),
                };
            } else if (discount.type == DiscountModel.types.percent) {
                const new_price = sum_product_price * (1 - (discount.value / 100));
                if (new_price <= 0) {
                    return {
                        success: true,
                        error: null,
                        price_with_discount: 0,
                    };
                }
                return {
                    success: true,
                    error: null,
                    price_with_discount: parseInt(new_price),
                };
            }
        }
    } catch {/* empty */ }

    return {
        success: false,
        error: 'خطا',
        price_with_discount: sum_product_price,
    };
}

async function calculate_post_price(shipping_method_id = null, address_id = null, total_weight = 0, total_price_with_discount = 0) {
    const { ShippingMethodModel, AddressModel } = require("@models");
    const { get_setting } = require("@helpers/SettingHelper");

    let shipping_method;
    try {
        shipping_method = await ShippingMethodModel.findById(shipping_method_id || this.shipping_method_id);
    } catch {/* empty */ }

    try {
        if (shipping_method) {
            const shipping_method_setting = await get_setting('shipping_methods');
            const shipping_method_prices = (shipping_method_setting?.value ?? []).find(shipping_method => String(shipping_method.shipping_method_id) == String(shipping_method_id || this.shipping_method_id));

            const shipping_method_attribute = shipping_method.attributes.find((cond) => {
                switch (cond.operator) {
                    case ShippingMethodModel.attributes_operators.less_than:
                        if (total_weight <= cond.from_weight)
                            return true;
                        return false;
                    case ShippingMethodModel.attributes_operators.between:
                        if (total_weight >= cond.from_weight && total_weight < cond.to_weight)
                            return true;
                        return false;
                    case ShippingMethodModel.attributes_operators.more_than:
                        if (total_weight > cond.to_weight)
                            return true;
                        return false;
                    default:
                        return false;
                }
            });

            let shipping_method_prices_attribute;
            if (Array.isArray(shipping_method_prices?.attributes)) {
                shipping_method_prices_attribute = (shipping_method_prices?.attributes ?? []).find(attr => {
                    return String(attr.attribute_id) == String(shipping_method_attribute._id)
                })
            } else if (shipping_method_prices.attribute && typeof shipping_method_prices.attribute == 'object') {
                shipping_method_prices_attribute = shipping_method_prices.attribute;
            }

            const address = await AddressModel.findById(address_id || this.address_id);
            const shop_city_id = (await get_setting('shop_city')).value;
            const all_cities = (await get_setting('all_cities')).value;
            const shop_city = all_cities.find(city => String(city.id) == String(shop_city_id));
            const neighboring_states = (await get_setting('neighboring_states')).value;

            let pricing = null;
            if (String(shop_city_id) == String(address.city_id)) { // same city
                pricing = shipping_method_prices_attribute.same_city;
            } else if (String(shop_city.state_id) == String(address.state_id)) { // same state
                pricing = shipping_method_prices_attribute.same_state;
            } else if (neighboring_states.includes(address.state_id)) { // neighboring state
                pricing = shipping_method_prices_attribute.neighboring_state;
            } else { // other states
                pricing = shipping_method_prices_attribute.not_neighboring_state;
            }

            if (pricing.type == "free" || pricing.type == "after_delivery") {
                return {
                    post_price: 0,
                    is_active: true,
                }
            } else if (pricing.type == "inactive") {
                return {
                    post_price: 0,
                    is_active: false,
                }
            } else if (pricing.type == "price") {

                if (pricing.price_type == "amount") {
                    post_price = pricing.price;
                } else if (pricing.price_type == "percent") {
                    post_price = total_price_with_discount * (pricing.price / 100);
                }

                if (!post_price)
                    post_price = 0;

                return {
                    post_price: parseInt(post_price),
                    is_active: true,
                }
            }
        }
    } catch (e) { console.log(e);/* empty */ }

    return {
        post_price: 0,
        is_active: false,
    }
}

module.exports = {
    calculate_sum,
    calculate_discount,
    calculate_post_price,
}
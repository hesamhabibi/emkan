const faker = require('faker');
const mongoose = require('mongoose');
const { get_setting } = require('@helpers/SettingHelper');
const { OrderModel, UserModel, ProductModel, TransactionModel, AddressModel, ShippingMethodModel } = require('@models');

const random_number = (length, min = 1) => {
    return min + Math.floor(Math.random() * length);
};

const random_array = (arr) => {
    try {
        const arr_length = arr.length;
        return arr[random_number(arr_length, 0)];
    } catch {
        return null;
    }
};

// const helper_multilang = (type = null) => {
//     const item = {};
//     faker.setLocale('en');
//     if (!type)
//         item.en = faker.commerce.productAdjective();
//     else if (type == 'color')
//         item.en = faker.commerce.color();
//     faker.setLocale('fa');
//     if (!type)
//         item.fa = faker.commerce.productAdjective();
//     else if (type == 'color')
//         item.fa = faker.commerce.color();
//     return item;
// };

const helper_random_date = (start, end) => {
    return new Date(start + Math.random() * (end - start));
};

module.exports = async () => {
    try {
        const input = {};
        const order_id = mongoose.Types.ObjectId();

        const random_user = (await UserModel.aggregate([{ $sample: { size: 1 } }]))[0];
        let random_address = (await AddressModel.aggregate([{ $sample: { size: 1 } }]))[0];
        if (!random_address) {
            // todo: create new address
            const a_input = {};

            a_input.postal_code = String(random_number(99999, 10000)) + String(random_number(99999, 10000));
            a_input.city_id = 647;
            a_input.state_id = 17;
            a_input.address = random_array([
                "بلوار نصر شرقی - کوچه بهداشت",
                "میدان مطهری شمالی - کوچه ۳۹",
                "میدان مطهری جنوبی کوچه ۵۴",
                "کوچه علی چپ",
                "بلوار مدرس - پایگاه هوایی شهید دوران",
            ]);
            a_input.is_default = random_number(1, 0);
            a_input.model_name = UserModel.modelName;
            a_input.model_id = random_user._id;

            random_address = await AddressModel.create(a_input);
        }

        const order_amount = random_number(1000) * 100;

        let last_transaction = null;
        for (let i = 0; i < 10; i++) {
            const t_input = {};

            t_input.sand_box = random_number(1, 0);
            t_input.status = random_number(3);
            t_input.gateway = random_number(1);
            t_input.amount = order_amount;
            t_input.description = faker.commerce.productDescription();
            t_input.unique_number = parseInt(Date.now() / 1000);
            t_input.paidAt = helper_random_date(Date.now() - 1000 * 60 * 60 * 24 * 10, Date.now() + 1000 * 60 * 60 * 24 * 10);
            t_input.verifiedAt = helper_random_date(Date.now() - 1000 * 60 * 60 * 24 * 10, Date.now() + 1000 * 60 * 60 * 24 * 10);
            t_input.payment_url = helper_random_date(Date.now() - 1000 * 60 * 60 * 24 * 10, Date.now() + 1000 * 60 * 60 * 24 * 10);

            t_input.tracking_code = String(random_number(999999, 100000)) + String(random_number(999999, 100000));
            t_input.credit_card = String(random_number(999999, 100000)) + "******" + String(random_number(999999, 100000));

            t_input.order_id = order_id;
            t_input.user_id = random_user._id;

            last_transaction = await TransactionModel.create(t_input);

            if (t_input.status == 3) {
                break;
            }
        }

        input._id = order_id;
        input.user_id = random_user._id;
        input.transaction_id = last_transaction?._id;
        input.address_id = random_address?._id;

        try {
            let random_shipping_method = (await ShippingMethodModel.aggregate([{ $sample: { size: 1 } }]))[0];
            input.shipping_method_id = random_shipping_method._id;
        } catch {/* empty */ }
        try {

            // find payment_gateways
            let payment_gateways;
            try {
                payment_gateways = (await get_setting('payment_gateways')).value || [];
            } catch {
                payment_gateways = [];
            }

            const random_payment_gateway = random_array(payment_gateways);
            input.payment_gateway_id = random_payment_gateway.id;
        } catch {/* empty */ }
        input.type = random_number(Object.keys(OrderModel.types).length);
        input.is_inquiry = false;

        const products = [];
        for (let i = 0; i < random_number(5); i += 1) {
            const random_product = (await ProductModel.aggregate([{ $sample: { size: 1 } }]))[0];
            if (random_product) {
                faker.setLocale(['fa', 'en'][random_number(1, 0)]);
                for (let j in random_product.mix_variant) {
                    if (random_number(5, 0)) {
                        products.push({
                            product_id: random_product._id,
                            mix_variant_keys: random_product.mix_variant[j].keys,
                            price_id: random_product.mix_variant[j].price_id,
                            count: random_number(20),
                            note: faker.commerce.productAdjective(),
                        });
                    }
                }
            }
        }
        input.products = products;

        if (input.type == OrderModel.types.complete) {
            input.date = helper_random_date(Date.now() - 1000 * 60 * 60 * 24 * 10, Date.now() + 1000 * 60 * 60 * 24 * 10);
            input.number = 'PD' + String(random_number(999999, 100000));
            input.post_track_code = String(random_number(999999, 100000)) + String(random_number(999999, 100000));
            input.status = random_number(Object.keys(OrderModel.statuses).length, 0);
            // input.note = faker.commerce.productDescription();
            for (let k = 40; k < random_number(60, 40); k++)
                input.note += faker.commerce.productName();
        }

        const order = await OrderModel.create(input);

        console.log(order);
    } catch (e) {
        console.log(e);
        console.log('some error occurred when creating order');
    }
};
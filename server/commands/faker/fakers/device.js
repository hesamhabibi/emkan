const faker = require('faker');
const mongoose = require('mongoose');
const { ProductModel, SEOModel, MediaModel } = require('@models');
const { createVariantPrice } = require('@helpers/PriceHelper');

const random_number = (length, min = 1) => {
    return min + Math.floor(Math.random() * length);
};

const helper_multilang = (type = null) => {
    const item = {};
    faker.setLocale('en');
    if (!type)
        item.en = faker.commerce.productAdjective();
    else if (type == 'color')
        item.en = faker.commerce.color();
    faker.setLocale('fa');
    if (!type)
        item.fa = faker.commerce.productAdjective();
    else if (type == 'color')
        item.fa = faker.commerce.color();
    return item;
};

module.exports = async () => {
    try {
        const input = {};
        const product_id = mongoose.Types.ObjectId();

        input._id = product_id;
        faker.setLocale('fa');
        input.title = {};
        faker.setLocale('en');
        input.title.en = faker.commerce.product();
        faker.setLocale('fa');
        input.title.fa = faker.commerce.product();

        input.summary = {};
        faker.setLocale('en');
        input.summary.en = faker.commerce.productName();
        faker.setLocale('fa');
        input.summary.fa = faker.commerce.productName();

        input.description = {};
        input.description.en = '';
        input.description.fa = '';
        faker.setLocale('en');
        for (let i = -10; i < random_number(10); i += 1) {
            for (let j = 1; j < random_number(7); j += 1)
                input.description.en += "<br>";
            input.description.en += faker.commerce.productDescription();
        }
        faker.setLocale('fa');
        for (let i = -10; i < random_number(10); i += 1) {
            for (let j = 1; j < random_number(7); j += 1)
                input.description.fa += "<br>";
            // input.description.fa += faker.commerce.productDescription();
            for (let k = 40; k < random_number(60, 40); k++)
                input.description.fa += faker.commerce.productName();
        }

        const has_main_features = Math.random() > 0.5 ? false : true;

        if (!has_main_features) {

            input.strengths = [];
            const strengths_length = random_number(5, 0);
            for (let i = 0; i < strengths_length; i += 1) {
                const item = {};
                faker.setLocale('en');
                item.en = faker.commerce.productAdjective();
                faker.setLocale('fa');
                item.fa = faker.commerce.productAdjective();
                input.strengths.push(item);
            }

            input.weaknesses = [];
            const weaknesses_length = random_number(5, 0);
            for (let i = 0; i < weaknesses_length; i += 1) {
                const item = {};
                faker.setLocale('en');
                item.en = faker.commerce.productAdjective();
                faker.setLocale('fa');
                item.fa = faker.commerce.productAdjective();
                input.weaknesses.push(item);
            }
        } else {

            input.main_features = [];
            const main_features_length = random_number(5, 0);
            for (let i = 0; i < main_features_length; i += 1) {
                const item = {};
                faker.setLocale('en');
                item.en = `${faker.commerce.department()}: ${faker.commerce.productAdjective()}`;
                faker.setLocale('fa');
                item.fa = `${faker.commerce.department()}: ${faker.commerce.productAdjective()}`;
                input.main_features.push(item);
            }
        }

        input.media_gallery = [];
        for (let i = 0; i < random_number(10); i += 1) {
            let random_media = (await MediaModel.aggregate([{ $sample: { size: 1 } }]))[0];
            if (i == 0) { // main media
                input.media = {
                    media_id: random_media._id,
                    alt: random_media.alt,
                    url: random_media.url,
                };
            }
            input.media_gallery.push({
                media_id: random_media._id,
                sort: 1,
                main: i == 0 ? true : false,
                alt: random_media.alt,
                url: random_media.url,
            });
        }

        input.status = 2;
        // input.type = random_number(4);
        input.type = 4;

        input.has_variant = random_number(2, 0) || true;
        if (input.has_variant) {
            const type = random_number(2);
            let labels = [];
            if (type == 2) {
                const value1 = { color_value: faker.internet.color() };
                const value2 = { color_value: faker.internet.color() };

                labels = [
                    {
                        key: '1-1',
                        title: helper_multilang('color'),
                        values: value1,
                    },
                    {
                        key: '1-2',
                        title: helper_multilang('color'),
                        values: value2,
                    }
                ];
            } else {
                labels = [
                    {
                        key: '1-1',
                        title: helper_multilang(),
                        values: null,
                    },
                    {
                        key: '1-2',
                        title: helper_multilang(),
                        values: null,
                    }
                ];
            }
            input.variant = [
                {
                    name: helper_multilang(),
                    type,
                    labels,
                }
            ];

            faker.setLocale('en');
            input.mix_variant = [
                {
                    keys: ['1-1'],
                    is_main_price: true,
                    is_active: true,
                    sort: 1,
                    details: {
                        product_code: 'PD' + String(random_number(999999, 100000)),
                        warehouse: faker.address.streetAddress(false),
                        count: random_number(100, 0),
                        count_status: random_number(6),
                        count_unit: random_number(24),
                        limit_min: random_number(3, 3),
                        limit_max: random_number(3, 7),
                        length: random_number(100, 10) * 10,
                        width: random_number(100, 10) * 10,
                        height: random_number(100, 10) * 10,
                        weight: random_number(100, 10) * 250,
                    },
                    price_id: (await createVariantPrice({
                        model_name: ProductModel.modelName,
                        model_id: product_id,
                        model_variant_keys: ['1-1'],
                    }, {
                        price: random_number(1000, 100) * 1000,
                        offer_price: random_number(2, 0) ? random_number(1000, 100) * 1000 : null,
                    })).price._id,
                },
                {
                    keys: ['1-2'],
                    is_main_price: false,
                    is_active: true,
                    sort: 2,
                    details: {
                        product_code: 'PD' + String(random_number(999999, 100000)),
                        warehouse: faker.address.streetAddress(false),
                        count: random_number(100, 0),
                        count_status: random_number(6),
                        count_unit: random_number(24),
                        limit_min: random_number(3, 3),
                        limit_max: random_number(3, 7),
                        length: random_number(100, 10) * 10,
                        width: random_number(100, 10) * 10,
                        height: random_number(100, 10) * 10,
                        weight: random_number(100, 10) * 250,
                    },
                    price_id: (await createVariantPrice({
                        model_name: ProductModel.modelName,
                        model_id: product_id,
                        model_variant_keys: ['1-2'],
                    }, {
                        price: random_number(1000, 100) * 1000,
                        offer_price: random_number(2, 0) ? random_number(1000, 100) * 1000 : null,
                    })).price._id,
                }
            ];
        } else {
            input.details = {
                product_code: 'PD' + String(random_number(999999, 100000)),
                warehouse: faker.address.streetAddress(false),
                count: random_number(100, 0),
                count_status: random_number(6),
                count_unit: random_number(24),
                limit_min: random_number(3, 3),
                limit_max: random_number(3, 7),
                length: random_number(100, 10) * 10,
                width: random_number(100, 10) * 10,
                height: random_number(100, 10) * 10,
                weight: random_number(100, 10) * 250,
            };
            input.price_id = (await createVariantPrice({ // todo: update relations(or use attachPrice)
                model_name: ProductModel.modelName,
                model_id: product_id,
                model_variant_keys: ['1-1'],
            }, {
                price: random_number(1000, 100) * 1000,
                offer_price: random_number(1000, 100) * 1000,
            })).price._id;

            input.variant = [{
                name: { fa: "پیش فرض", en: "default" },
                type: ProductModel.variant_types.text,
                labels: [{
                    key: 'default',
                    title: { fa: "پیش فرض", en: "default" },
                    values: {},
                }]
            }];
            input.mix_variant = [{
                keys: ['default'],
                is_main_price: true,
                is_active: -1,
                sort: 1,
                details: input.details,
                price_id: input.price_id,
            }];
        }

        faker.setLocale('en');
        const seo_input = {
            url: faker.commerce.product() + "-" + faker.commerce.product() + "-" + faker.commerce.product(),
        };
        const seo = await SEOModel.create(seo_input);
        input.seo_id = seo._id;

        input.publishAt = Date.now();
        input.is_special = random_number(2, 0);

        const product = await ProductModel.create(input);

        console.log(product);
    } catch (e) {
        console.log('some error occurred when creating product');
    }
};
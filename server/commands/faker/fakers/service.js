const faker = require('faker');
const mongoose = require('mongoose');
const { BlogModel, SEOModel, UserModel, CategoryModel, MediaModel } = require('@models');

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

        input.status = 2;
        input.has_rating = random_number(1, 0);
        input.has_comment = random_number(1, 0);
        // input.type = random_number(4);
        input.type = 5;

        const random_category = (await CategoryModel.aggregate([{ $match: { type: 1 } }, { $sample: { size: 1 } }]))[0];
        input.category_id = random_category._id;

        input.media_gallery = [];
        for (let i = 0; i < random_number(4); i += 1) {
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

        let random_media = (await MediaModel.aggregate([{ $sample: { size: 1 } }]))[0];
        input.document = {
            media_id: random_media._id,
            alt: random_media.alt,
            url: random_media.url,
        };

        faker.setLocale('en');
        const seo_input = {
            url: faker.commerce.product() + "-" + faker.commerce.product() + "-" + faker.commerce.product(),
        };
        const seo = await SEOModel.create(seo_input);
        input.seo_id = seo._id;
        // input.tag_ids = ['']; // todo
        // input.tag_group_id = ''; // todo
        let random_user = (await UserModel.aggregate([{ $sample: { size: 1 } }]))[0];
        input.user_id = random_user._id;

        input.publishAt = Date.now();

        const product = await BlogModel.create(input);

        console.log(product);
    } catch (e) {
        console.log(e);
        console.log('some error occurred when creating blog');
    }
};
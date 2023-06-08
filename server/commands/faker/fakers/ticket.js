const faker = require('faker');
const { TicketModel, UserModel, MediaModel } = require('@models');

const random_number = (length, min = 1) => {
    return min + Math.floor(Math.random() * length);
};


module.exports = async () => {
    try {
        const random_user = (await UserModel.aggregate([{ $sample: { size: 1 } }]))[0];
        const random_media = (await MediaModel.aggregate([{ $sample: { size: 1 } }]))[0];


        const input = {};
        faker.setLocale('fa');

        input.title = faker.commerce.product();
        input.text = faker.commerce.product();
        input.status = 1;
        input.department = 1;
        input.number = "DG" + String(random_number(999, 100));
        input.name = random_user.name;
        input.last_name = random_user.last_name;
        input.email = random_user.email;
        input.mobile = random_user.mobile;
        input.user_id = random_user._id;
        input.media = {
            media_id: random_media._id,
            alt: random_media.alt,
            url: random_media.url,
        };

        const ticket = await TicketModel.create(input);

        console.log(ticket);
    } catch (e) {
        console.log(e);
        console.log('some error occurred when creating ticket');
    }
};
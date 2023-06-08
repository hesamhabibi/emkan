/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
const { UserModel } = require('@models');
const users = require('./users_data/users');

module.exports = async () => {

    for (let i = 0; i < users.length; i += 1) {
        try {
            await UserModel.updateOne({ _id: users[i]._id }, users[i], { upsert: true });
        } catch (e) {
            console.log(e);
        }
    }
};
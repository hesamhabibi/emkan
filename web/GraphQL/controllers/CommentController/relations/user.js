const { collect } = require('collect.js');
module.exports = async (parent, args, { models: { UserModel } }) => {
    try {
        let user = (await UserModel.findOne({ _id: parent.user_id })).toObject();
        user = collect(user).only(['id', 'name', 'last_name', 'access_id', 'user_information']).all();
        user.user_information = collect(user.user_information).only(['media']).all();
        return user;
    } catch (e) {
        return null;
    }
};
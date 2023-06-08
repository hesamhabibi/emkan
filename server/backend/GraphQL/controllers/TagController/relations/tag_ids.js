
const { collect } = require('collect.js');
module.exports = async (parent, args, { models: { TagModel } }) => {
    try {
        return collect(await TagModel.find({ tag_group_ids: parent._id })).pluck('_id').all();
    } catch (e) {
        return [];
    }
};
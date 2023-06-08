const { collect } = require('collect.js');
const { TagModel } = require('../models');

const get_tag_ids_by_tag_group_ids = async (tag_group_ids, tag_ids = []) => {
    try {
        return [...tag_ids, ...collect(await TagModel.find({ tag_group_id: { '$in': tag_group_ids } })).pluck('_id').all()];
    } catch (e) {
        return tag_ids;
    }
};

module.exports = {
    get_tag_ids_by_tag_group_ids,
};